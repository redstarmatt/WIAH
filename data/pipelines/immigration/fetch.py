"""
Immigration data pipeline -- fetch.py

Downloads:
  1. ONS Long-term International Migration (net migration) -- XLSX
  2. Home Office Asylum summary -- ODS
  3. Home Office Visa summary -- ODS
  4. Home Office Small boats time series -- ODS
  5. Home Office Returns summary -- ODS
"""

import hashlib
import logging
import time
from datetime import date
from pathlib import Path

import requests

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "immigration"
RAW.mkdir(parents=True, exist_ok=True)

TODAY = date.today().isoformat()

HEADERS = {
    "User-Agent": "WIAH-data-pipeline/1.0 (+https://whatisactuallyhappening.uk)",
}


def md5_bytes(data):
    return hashlib.md5(data).hexdigest()


def download_file(name, url, ext="ods"):
    """Download a file, skip if already exists today."""
    dest = RAW / f"{TODAY}_{name}.{ext}"
    if dest.exists():
        log.info(f"  {name}: already downloaded today, skipping")
        return dest

    log.info(f"  {name}: downloading...")
    resp = requests.get(url, headers=HEADERS, timeout=120)
    if resp.status_code != 200:
        log.error(f"  {name}: HTTP {resp.status_code} -- {url}")
        return None

    dest.write_bytes(resp.content)
    log.info(f"  {name}: saved ({len(resp.content):,} bytes)")
    return dest


# --- Data sources ---

# ONS Net Migration (LTIM) -- XLSX
# Landing: https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/longterminternationalimmigrationemigrationandnetmigrationflowsprovisional
ONS_LTIM_URL = (
    "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/"
    "populationandmigration/internationalmigration/datasets/"
    "longterminternationalimmigrationemigrationandnetmigrationflowsprovisional/"
    "yearendingjune2025/ltimnov25.xlsx"
)

# Home Office data tables page:
# https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables

# Asylum summary (ODS) -- Dec 2025
ASYLUM_SUMMARY_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "69958fd2b33a4db7ff889d45/asylum-summary-dec-2025-tables.ods"
)

# Visa summary (ODS) -- Dec 2025
VISA_SUMMARY_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "6996f283a58a315dbe72bfea/visas-summary-dec-2025-tables.ods"
)

# Small boats time series (ODS) -- weekly updates
SMALL_BOATS_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "69a19217286b6fdc85daeab5/27_February_2026_Small_boats_-_time_series.ods"
)

# Returns summary (ODS) -- Dec 2025
RETURNS_SUMMARY_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "699593fc047739fe61889d46/returns-summary-dec-2025-tables.ods"
)


def main():
    log.info("=== Immigration fetch.py ===")

    download_file("ons_ltim", ONS_LTIM_URL, ext="xlsx")
    time.sleep(2)

    download_file("asylum_summary", ASYLUM_SUMMARY_URL, ext="ods")
    time.sleep(2)

    download_file("visa_summary", VISA_SUMMARY_URL, ext="ods")
    time.sleep(2)

    download_file("small_boats", SMALL_BOATS_URL, ext="ods")
    time.sleep(2)

    download_file("returns_summary", RETURNS_SUMMARY_URL, ext="ods")

    log.info("Done -- Immigration fetch complete")


if __name__ == "__main__":
    main()
