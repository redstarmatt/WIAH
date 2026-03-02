"""
Crime Trends — fetch.py

Downloads ONS "Crime in England and Wales" appendix tables (XLSX).
Contains annual recorded crime by offence type, 2002/03–present.

Source: ONS, Crime in England and Wales, Appendix Tables
"""

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
RAW_DIR    = ROOT / "data" / "raw" / "crime-trends"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

LANDING_URL = "https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/datasets/crimeinenglandandwalesappendixtables"
BASE_URL    = "https://www.ons.gov.uk"

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


def find_xlsx_url():
    """Scrape the ONS landing page for the latest .xlsx download link."""
    session = requests.Session()
    session.headers.update(SESSION_HEADERS)

    log.info("Scraping %s", LANDING_URL)
    resp = session.get(LANDING_URL, timeout=30)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.endswith(".xlsx") and "appendixtable" in href.lower():
            url = href if href.startswith("http") else BASE_URL + href
            log.info("Found XLSX URL: %s", url)
            return url

    # Fallback: find any xlsx link
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.endswith(".xlsx"):
            url = href if href.startswith("http") else BASE_URL + href
            log.info("Fallback XLSX URL: %s", url)
            return url

    return None


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    session = requests.Session()
    session.headers.update(SESSION_HEADERS)

    url = find_xlsx_url()
    if not url:
        log.error("Could not find appendix tables XLSX on ONS page")
        sys.exit(1)

    log.info("Downloading %s", url)
    resp = session.get(url, timeout=60)
    resp.raise_for_status()
    data = resp.content
    checksum = md5(data)

    if checksum == state.get("appendix_md5"):
        log.info("File unchanged (MD5 match). Skipping.")
        return

    today = datetime.now().strftime("%Y%m%d")
    filename = f"crime_appendix_{today}.xlsx"
    out_path = RAW_DIR / filename
    out_path.write_bytes(data)
    log.info("Saved %s (%d bytes)", out_path, len(data))

    stable_path = RAW_DIR / "crime_appendix.xlsx"
    stable_path.write_bytes(data)

    state["appendix_md5"] = checksum
    state["appendix_url"] = url
    state["appendix_file"] = filename
    state["last_fetch"] = datetime.now().isoformat()
    save_state(state)

    log.info("Fetch complete.")


if __name__ == "__main__":
    main()
