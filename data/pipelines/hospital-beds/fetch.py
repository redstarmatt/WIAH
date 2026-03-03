"""
fetch.py — Download NHS England KH03 bed availability and occupancy data.

Source: NHS England — Bed Availability and Occupancy (KH03 returns)
URL: https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/
Format: Excel (.xlsx), quarterly, national timeseries from 2010-11 onwards
"""

import json
import logging
import hashlib
import requests
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "hospital-beds"
STATE_FILE = RAW_DIR / "_state.json"

# Direct URL for the KH03 timeseries file (2010-11 onwards)
TIMESERIES_URL = "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/02/Beds-Timeseries-2010-11-onwards-Q3-2025-26-revised.xlsx"

# Fallback: scrape the landing page for the latest timeseries file
LANDING_URL = "https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/bed-availability-and-occupancy-kh03/"


def md5(data):
    return hashlib.md5(data).hexdigest()


def try_direct_download():
    """Try the known direct URL first."""
    log.info(f"Trying direct URL: {TIMESERIES_URL}")
    resp = requests.get(TIMESERIES_URL, timeout=60)
    if resp.status_code == 200 and len(resp.content) > 10000:
        return resp.content
    log.warning(f"Direct URL returned status {resp.status_code}, trying scrape fallback...")
    return None


def scrape_for_timeseries():
    """Scrape the landing page for the timeseries Excel link."""
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        log.error("beautifulsoup4 not installed. Run: pip3 install beautifulsoup4")
        return None

    log.info(f"Scraping landing page: {LANDING_URL}")
    resp = requests.get(LANDING_URL, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    for link in soup.find_all("a", href=True):
        href = link["href"]
        text = link.get_text(strip=True).lower()
        if "timeseries" in text.lower() or "time-series" in text.lower() or "time series" in text.lower():
            if href.endswith(".xlsx") or href.endswith(".xls"):
                url = href if href.startswith("http") else "https://www.england.nhs.uk" + href
                log.info(f"Found timeseries link: {url}")
                r = requests.get(url, timeout=60)
                if r.status_code == 200 and len(r.content) > 10000:
                    return r.content

    # Broader search: any xlsx with "beds" and "timeseries" in URL
    for link in soup.find_all("a", href=True):
        href = link["href"]
        if ("beds" in href.lower() and "timeseries" in href.lower()) or \
           ("beds" in href.lower() and "time-series" in href.lower()):
            if href.endswith(".xlsx") or href.endswith(".xls"):
                url = href if href.startswith("http") else "https://www.england.nhs.uk" + href
                log.info(f"Found beds timeseries link (broad match): {url}")
                r = requests.get(url, timeout=60)
                if r.status_code == 200 and len(r.content) > 10000:
                    return r.content

    log.error("Could not find timeseries Excel link on landing page")
    return None


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    # Try direct URL, then scrape
    content = try_direct_download()
    if content is None:
        content = scrape_for_timeseries()
    if content is None:
        log.error("Failed to download hospital beds data from any source")
        raise SystemExit(1)

    # MD5 dedup
    new_hash = md5(content)
    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())
    old_hash = state.get("hospital_beds", {}).get("md5")

    if new_hash == old_hash:
        log.info("No change in hospital beds data (MD5 match). Skipping.")
        state["hospital_beds"]["any_new_data"] = False
        STATE_FILE.write_text(json.dumps(state, indent=2))
        return

    # Save
    datestamp = datetime.now().strftime("%Y%m%d")
    out_path = RAW_DIR / f"beds_timeseries_{datestamp}.xlsx"
    out_path.write_bytes(content)
    stable = RAW_DIR / "beds_timeseries.xlsx"
    stable.write_bytes(content)
    log.info(f"Saved {len(content):,} bytes to {out_path.name} + {stable.name}")

    state["hospital_beds"] = {
        "md5": new_hash,
        "retrieved": datetime.now().isoformat(),
        "file": out_path.name,
        "any_new_data": True,
    }
    STATE_FILE.write_text(json.dumps(state, indent=2))
    log.info("Done.")


if __name__ == "__main__":
    main()
