"""
Housing data pipeline — fetch.py
Downloads ONS housing affordability, house prices, and rental data.

Sources:
  1. ONS Affordability ratios (workplace-based)   — XLSX, annual, stable /current/ URL
  2. ONS Median house prices (admin geographies)   — XLSX, annual, stable /current/ URL
  3. Land Registry UK HPI full file                — CSV,  monthly, dynamic URL
  4. ONS Private rental affordability              — XLSX, annual, stable /current/ URL
  5. ONS PIPR historical series (rent index)       — XLSX, annual, stable /current/ URL
"""

import hashlib
import logging
import time
from datetime import date, timedelta
from pathlib import Path

import requests

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "housing"
RAW.mkdir(parents=True, exist_ok=True)

TODAY = date.today().isoformat()

HEADERS = {
    "User-Agent": "WIAH-data-pipeline/1.0 (+https://whatisactuallyhappening.uk)",
}

# ── Stable sources (ONS /current/ URLs) ─────────────────────────────────────

# Each source has a primary URL and a fallback (ONS /current/ alias is unreliable)
SOURCES = {
    "affordability_ratio": [
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/housing/"
        "datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian/"
        "current/aff1ratioofhousepricetoworkplacebasedearnings.xlsx",
    ],
    "median_house_prices": [
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/housing/"
        "datasets/medianhousepricesforadministrativegeographies/"
        "yearendingmarch2025/medianpricepaidforadministrativegeographies.xlsx",
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/housing/"
        "datasets/medianhousepricesforadministrativegeographies/"
        "current/medianpricepaidforadministrativegeographies.xlsx",
    ],
    "rental_affordability": [
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/housing/"
        "datasets/privaterentalaffordabilityengland/"
        "2024/privaterentalaffordability2024.xlsx",
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/housing/"
        "datasets/privaterentalaffordabilityengland/"
        "current/privaterentalaffordability2024.xlsx",
    ],
    "rent_index_historical": [
        "https://www.ons.gov.uk/file?uri=/economy/inflationandpriceindices/"
        "datasets/priceindexofprivaterentsukhistoricalseries/"
        "26march2025/priceindexofprivaterentsukhistoricalseries.xlsx",
        "https://www.ons.gov.uk/file?uri=/economy/inflationandpriceindices/"
        "datasets/priceindexofprivaterentsukhistoricalseries/"
        "current/priceindexofprivaterentsukhistoricalseries.xlsx",
    ],
}


def md5(path):
    """Return hex MD5 of a file."""
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def download(name, url, ext="xlsx"):
    """Download a file, skip if unchanged (MD5 dedup)."""
    dest = RAW / f"{TODAY}_{name}.{ext}"

    # Check if we already have today's file
    if dest.exists():
        log.info(f"  {name}: already downloaded today, skipping")
        return dest

    log.info(f"  {name}: downloading…")
    resp = requests.get(url, headers=HEADERS, timeout=120)
    if resp.status_code != 200:
        log.error(f"  {name}: HTTP {resp.status_code} — {url}")
        return None

    # Check for duplicate content
    new_hash = hashlib.md5(resp.content).hexdigest()
    existing = sorted(RAW.glob(f"*_{name}.{ext}"))
    if existing:
        old_hash = md5(existing[-1])
        if old_hash == new_hash:
            log.info(f"  {name}: unchanged ({len(resp.content):,} bytes)")
            return existing[-1]

    dest.write_bytes(resp.content)
    log.info(f"  {name}: saved ({len(resp.content):,} bytes)")
    return dest


def find_hpi_csv():
    """Try recent months to find the latest Land Registry UK HPI CSV."""
    d = date.today().replace(day=1)
    for _ in range(12):
        d -= timedelta(days=1)
        d = d.replace(day=1)
        url = (
            f"https://publicdata.landregistry.gov.uk/market-trend-data/"
            f"house-price-index-data/UK-HPI-full-file-{d.year}-{d.month:02d}.csv"
        )
        resp = requests.head(url, headers=HEADERS, timeout=30)
        if resp.status_code == 200:
            log.info(f"  Found HPI CSV for {d.year}-{d.month:02d}")
            return url
        time.sleep(0.5)
    return None


def main():
    log.info("=== Housing fetch.py ===")

    # 1–4: ONS sources (try each URL in order)
    for name, urls in SOURCES.items():
        ok = False
        for url in urls:
            result = download(name, url, ext="xlsx")
            if result:
                ok = True
                break
            time.sleep(1)
        if not ok:
            log.error(f"  {name}: ALL URLs failed")
        time.sleep(2)  # be nice to ONS

    # 5: Land Registry HPI (dynamic URL)
    log.info("  Searching for latest Land Registry UK HPI CSV…")
    hpi_url = find_hpi_csv()
    if hpi_url:
        download("uk_hpi", hpi_url, ext="csv")
    else:
        log.warning("  Could not find recent UK HPI CSV — skipping")

    log.info("✓ Housing fetch complete")


if __name__ == "__main__":
    main()
