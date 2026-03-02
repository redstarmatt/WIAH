"""
RTT Waiting Lists — fetch.py

Downloads the NHS England RTT (Referral to Treatment) Overview Timeseries file.
This is a single cumulative Excel workbook containing the full national history
back to 2007, updated monthly (~6 weeks lag).

The file URL includes a hash suffix that changes each release, so we scrape
the data page to find the current download link.

Sources:
  - NHS England, Consultant-led Referral to Treatment Waiting Times
  - https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/
"""

import os
import re
import sys
import json
import logging
import hashlib
from datetime import datetime
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "rtt-waiting"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

# Data pages — current + recent financial years
DATA_PAGES = [
    "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/rtt-data-2025-26/",
    "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/rtt-data-2024-25/",
]

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ────────────────────────────────────────────────────────────────────

def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def md5(data):
    return hashlib.md5(data).hexdigest()


def find_timeseries_url():
    """Scrape the data pages to find the RTT Overview Timeseries download link."""
    session = requests.Session()
    session.headers.update(SESSION_HEADERS)

    for page_url in DATA_PAGES:
        log.info("Scraping %s", page_url)
        try:
            resp = session.get(page_url, timeout=30)
            resp.raise_for_status()
        except Exception as e:
            log.warning("Could not fetch %s: %s", page_url, e)
            continue

        soup = BeautifulSoup(resp.text, "html.parser")
        for a in soup.find_all("a", href=True):
            text = a.get_text(strip=True).lower()
            href = a["href"]
            # Look for the Overview Timeseries file
            if "overview" in text and "timeseries" in text and href.endswith((".xlsx", ".xls")):
                url = href if href.startswith("http") else "https://www.england.nhs.uk" + href
                log.info("Found timeseries URL: %s", url)
                return url

    return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    session = requests.Session()
    session.headers.update(SESSION_HEADERS)

    # 1. Find the current timeseries URL
    url = find_timeseries_url()
    if not url:
        log.error("Could not find RTT Overview Timeseries URL on any data page")
        sys.exit(1)

    # 2. Download the file
    log.info("Downloading %s", url)
    resp = session.get(url, timeout=60)
    resp.raise_for_status()
    data = resp.content
    checksum = md5(data)

    if checksum == state.get("timeseries_md5"):
        log.info("File unchanged (MD5 match). Skipping.")
        return

    # 3. Save with datestamp
    ext = ".xlsx" if url.endswith(".xlsx") else ".xls"
    today = datetime.now().strftime("%Y%m%d")
    filename = f"rtt_overview_timeseries_{today}{ext}"
    out_path = RAW_DIR / filename
    out_path.write_bytes(data)
    log.info("Saved %s (%d bytes)", out_path, len(data))

    # Also save as a stable name for transform.py
    stable_path = RAW_DIR / f"rtt_overview_timeseries{ext}"
    stable_path.write_bytes(data)

    # 4. Update state
    state["timeseries_md5"] = checksum
    state["timeseries_url"] = url
    state["timeseries_file"] = filename
    state["last_fetch"] = datetime.now().isoformat()
    save_state(state)

    log.info("Fetch complete. Ready for transform.")


if __name__ == "__main__":
    main()
