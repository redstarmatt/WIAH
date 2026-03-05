"""
fetch.py — Download universities data from official sources.

Sources:
  1. Student Loans Company annual student support statistics (Excel)
     Discovered via gov.uk content API → assets.publishing.service.gov.uk
  2. DfE LEO real terms earnings CSV
     via Explore Education Statistics API (UUID 881180a5-...)

Run:
  python data/pipelines/universities/fetch.py
"""

import hashlib
import json
import logging
import requests
from datetime import datetime
from pathlib import Path
from typing import Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "universities"
STATE_FILE = RAW_DIR / "_state.json"

HEADERS = {"User-Agent": "WIAH-pipeline/1.0 (+https://whatisactuallyhappening.uk)"}

# gov.uk content API for the SLC statistics collection
SLC_COLLECTION_API = (
    "https://www.gov.uk/api/content/government/collections/student-loans-company-statistics"
)

# DfE LEO real terms earnings — small CSV, known stable UUID
LEO_REAL_TERMS_UUID = "881180a5-faf0-4c32-b454-5bbe492da362"
EES_BASE = "https://explore-education-statistics.service.gov.uk/data-catalogue/data-set"


def md5(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()


def download_file(url: str, filename: str, state: dict, key: str) -> bool:
    """Download url → RAW_DIR/filename. Returns True if file is new or changed."""
    log.info(f"  Fetching {filename} …")
    log.info(f"  URL: {url[:100]}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=180, stream=True)
        resp.raise_for_status()
        content = resp.content
    except Exception as exc:
        log.warning(f"  Download failed: {exc}")
        return False

    log.info(f"  Received {len(content):,} bytes")
    new_hash = md5(content)
    old_hash = state.get(key, {}).get("md5")

    if new_hash == old_hash:
        log.info(f"  No change (MD5 match) — skipping")
        return False

    dest = RAW_DIR / filename
    dest.write_bytes(content)
    log.info(f"  Saved → {dest.name}")

    state[key] = {
        "md5": new_hash,
        "retrieved": datetime.now().isoformat(),
        "file": filename,
    }
    return True


def find_slc_excel_url() -> Optional[str]:
    """
    Use the gov.uk content API to discover the latest SLC student support
    statistics publication and return the Excel attachment URL.
    """
    log.info("  Fetching SLC collection via gov.uk API …")
    try:
        resp = requests.get(SLC_COLLECTION_API, headers=HEADERS, timeout=30)
        resp.raise_for_status()
        collection = resp.json()
    except Exception as exc:
        log.warning(f"  gov.uk collection API failed: {exc}")
        return None

    # The collection document links contain child publications
    links = collection.get("links", {}).get("documents", [])
    if not links:
        # Try the 'children' field depending on API version
        links = collection.get("links", {}).get("children", [])

    # Filter to "annual student support statistics" publications
    slc_pubs = [
        lnk for lnk in links
        if "student-support-statistics" in lnk.get("base_path", "")
        or "student-support" in lnk.get("base_path", "")
    ]

    if not slc_pubs:
        log.warning("  No student-support-statistics publications found in collection")
        return None

    # Sort descending by base_path (contains the year) → latest first
    slc_pubs.sort(key=lambda x: x.get("base_path", ""), reverse=True)
    latest = slc_pubs[0]
    log.info(f"  Latest SLC publication: {latest.get('base_path')}")

    # Fetch that publication to get downloadable attachments
    pub_api = f"https://www.gov.uk/api/content{latest['base_path']}"
    try:
        pub_resp = requests.get(pub_api, headers=HEADERS, timeout=30)
        pub_resp.raise_for_status()
        pub = pub_resp.json()
    except Exception as exc:
        log.warning(f"  Publication content fetch failed: {exc}")
        return None

    # Search for Excel attachment — prefer file with "tables" in name
    attachments = pub.get("details", {}).get("attachments", [])
    for att in attachments:
        url = att.get("url", "")
        if url.endswith(".xlsx") and "tables" in url.lower():
            return url
    for att in attachments:
        url = att.get("url", "")
        if url.endswith(".xlsx"):
            return url

    log.warning("  No .xlsx attachment found in SLC publication")
    return None


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())

    any_new = False

    # ── 1. SLC student support statistics Excel ────────────────────────────
    log.info("=== SLC Student Support Statistics ===")
    slc_url = find_slc_excel_url()
    if slc_url:
        if download_file(slc_url, "slc_student_support.xlsx", state, "slc"):
            any_new = True
    else:
        log.warning("  Skipping SLC download — URL not found via API")

    # ── 2. DfE LEO real terms earnings CSV ────────────────────────────────
    log.info("=== DfE LEO Real Terms Earnings ===")
    leo_url = f"{EES_BASE}/{LEO_REAL_TERMS_UUID}/csv"
    if download_file(leo_url, "leo_real_terms.csv", state, "leo_real_terms"):
        any_new = True

    # ── Write state ────────────────────────────────────────────────────────
    state["universities"] = {"any_new_data": any_new}
    STATE_FILE.write_text(json.dumps(state, indent=2))
    log.info(f"Done. any_new_data={any_new}")


if __name__ == "__main__":
    main()
