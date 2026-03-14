"""
Road Safety — fetch.py

Downloads STATS19 summary tables from DfT's annual road casualties report.
Uses GOV.UK Content API to discover the latest publication automatically.

Tables fetched (ODS format):
  RAS10001 — Reported casualties by severity, 1979–present
  RAS20001 — Casualties by road user type and severity
  RAS51001 — Casualties by region / police force area
"""

import hashlib
import json
import logging
import sys
import time
from datetime import datetime
from pathlib import Path

import requests

# ── Config ────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "road-safety"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
    "Accept": "application/json",
}

# GOV.UK Content API — road accidents collection
COLLECTION_API = (
    "https://www.gov.uk/api/content"
    "/government/collections/road-accidents-and-safety-statistics"
)

# Filenames to look for in the publication's attachments (case-insensitive prefix match)
TARGET_TABLES = ["ras10001", "ras20001", "ras51001"]

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
RAW_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ───────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def get_json(url: str) -> dict:
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.json()


def file_md5(path: Path) -> str:
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url: str, dest: Path, label: str) -> bool:
    """Download url → dest. Returns True if file was new/changed."""
    log.info("  Downloading %s …", label)
    r = requests.get(url, headers={**HEADERS, "Accept": "*/*"}, timeout=120, stream=True)
    r.raise_for_status()
    content = r.content

    if dest.exists():
        if file_md5(dest) == hashlib.md5(content).hexdigest():
            log.info("    unchanged, skipping.")
            return False

    dest.write_bytes(content)
    log.info("    saved %s (%d KB)", dest.name, len(content) // 1024)
    return True


# ── Discovery ─────────────────────────────────────────────────────────────────

def find_latest_annual_report() -> tuple[str, str]:
    """
    Walk the road-accidents collection via GOV.UK Content API.
    Returns (base_path, title) of the most recent annual report
    (ignores provisional estimates and supplementary tables).
    """
    log.info("Fetching collection index from GOV.UK API …")
    col = get_json(COLLECTION_API)

    documents = col.get("links", {}).get("documents", [])
    if not documents:
        raise RuntimeError("No documents found in collection API response.")

    # Filter to annual reports only (slug ends with -annual-report-YYYY)
    annual = [
        d for d in documents
        if "annual-report" in d.get("base_path", "")
        and "road-casualties" in d.get("base_path", "")
    ]

    if not annual:
        raise RuntimeError("Could not find any annual report links in collection.")

    # Sort by the 4-digit year at the end of the slug
    def year_key(doc):
        parts = doc["base_path"].rstrip("/").split("-")
        for part in reversed(parts):
            if part.isdigit() and len(part) == 4:
                return int(part)
        return 0

    annual.sort(key=year_key, reverse=True)
    latest = annual[0]
    log.info("Latest annual report: %s", latest["base_path"])
    return latest["base_path"], latest.get("title", "")


def get_attachment_urls(base_path: str) -> dict[str, str]:
    """
    Fetch the publication's Content API page and extract ODS attachment URLs
    for the target table names (ras10001, ras20001, ras51001).
    Returns {table_name: url}.
    """
    url = f"https://www.gov.uk/api/content{base_path}"
    log.info("Fetching publication metadata: %s", url)
    pub = get_json(url)

    attachments = pub.get("details", {}).get("attachments", [])
    if not attachments:
        # Some publications nest attachments under 'documents'
        attachments = pub.get("details", {}).get("documents", [])

    found = {}
    for att in attachments:
        fname = att.get("filename", "") or att.get("url", "").split("/")[-1]
        fname_lower = fname.lower()
        for table in TARGET_TABLES:
            if fname_lower.startswith(table) and table not in found:
                att_url = att.get("url") or att.get("attachment_url", "")
                if att_url:
                    found[table] = att_url
                    log.info("  %s → %s", table, att_url)

    if not found:
        log.warning(
            "No target attachments found via API for %s. "
            "Check the raw API response at %s", base_path, url
        )

    return found


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    any_new = False

    try:
        base_path, title = find_latest_annual_report()
        # e.g. "reported-road-casualties-great-britain-annual-report-2023"
        release_slug = base_path.rstrip("/").split("/")[-1]

        release_dir = RAW_DIR / release_slug
        release_dir.mkdir(parents=True, exist_ok=True)

        attachment_urls = get_attachment_urls(base_path)

        if not attachment_urls:
            # Fallback: try known stable URL pattern for most recent known release
            log.warning("Falling back to known stable URLs for 2023 report …")
            attachment_urls = _fallback_urls()

        for table, url in attachment_urls.items():
            ext = url.split("?")[0].rsplit(".", 1)[-1] or "ods"
            dest = release_dir / f"{table}.{ext}"
            updated = download(url, dest, label=table)
            if updated:
                any_new = True
            time.sleep(1)

        state["road_safety"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "release": release_slug,
            "title": title,
            "tables": list(attachment_urls.keys()),
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("Already up to date.")

    except Exception as e:
        log.error("FETCH FAILED: %s", e)
        state.setdefault("road_safety", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


def _fallback_urls() -> dict[str, str]:
    """
    Known stable URLs for the 2023 annual report tables.
    Updated manually when DfT publishes a new annual report.
    Last verified: March 2026 against the 2023 report (Sep 2024 release).
    """
    return {
        "ras10001": (
            "https://assets.publishing.service.gov.uk/media/"
            "66d9dbd1a3c2a28aca488882/ras10001.ods"
        ),
        "ras20001": (
            "https://assets.publishing.service.gov.uk/media/"
            "66d9dbd1a3c2a28aca488882/ras20001.ods"
        ),
        "ras51001": (
            "https://assets.publishing.service.gov.uk/media/"
            "66d9dbd1a3c2a28aca488882/ras51001.ods"
        ),
    }


if __name__ == "__main__":
    main()
