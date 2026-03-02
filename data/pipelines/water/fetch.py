"""
Water data pipeline — fetch.py

Downloads:
  1. EDM Long-term Trends (sewage discharge, 2016–2024) — ZIP/XLSX from EA
  2. Bathing water classifications (2015–2025) — CSV from BWQ API
  3. Defra B3 river health indicator — CSV
"""

import hashlib
import logging
import time
import zipfile
import io
from datetime import date
from pathlib import Path

import requests

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "water"
RAW.mkdir(parents=True, exist_ok=True)

TODAY = date.today().isoformat()

HEADERS = {
    "User-Agent": "WIAH-data-pipeline/1.0 (+https://whatisactuallyhappening.uk)",
}


def md5_bytes(data):
    return hashlib.md5(data).hexdigest()


def download_file(name, url, ext="csv"):
    """Download a file, skip if already exists today."""
    dest = RAW / f"{TODAY}_{name}.{ext}"
    if dest.exists():
        log.info(f"  {name}: already downloaded today, skipping")
        return dest

    log.info(f"  {name}: downloading…")
    resp = requests.get(url, headers=HEADERS, timeout=120)
    if resp.status_code != 200:
        log.error(f"  {name}: HTTP {resp.status_code} — {url}")
        return None

    dest.write_bytes(resp.content)
    log.info(f"  {name}: saved ({len(resp.content):,} bytes)")
    return dest


def download_edm_trends():
    """Download EDM Long-term Trends ZIP, extract XLSX."""
    xlsx_dest = RAW / f"{TODAY}_edm_trends.xlsx"
    if xlsx_dest.exists():
        log.info("  edm_trends: already downloaded today, skipping")
        return xlsx_dest

    url = (
        "https://environment.data.gov.uk/api/file/download?"
        "fileDataSetId=c55e170e-3c75-49a5-8026-a961ff94c8e0&"
        "fileName=EDM_Long-term_Trends_Storm_Overflow_Annual_Return.zip"
    )
    log.info("  edm_trends: downloading ZIP…")
    resp = requests.get(url, headers=HEADERS, timeout=120)
    if resp.status_code != 200:
        log.error(f"  edm_trends: HTTP {resp.status_code}")
        return None

    # Extract XLSX from ZIP
    try:
        zf = zipfile.ZipFile(io.BytesIO(resp.content))
        xlsx_files = [n for n in zf.namelist() if n.endswith('.xlsx')]
        if not xlsx_files:
            log.error("  edm_trends: no XLSX in ZIP")
            return None
        xlsx_data = zf.read(xlsx_files[0])
        xlsx_dest.write_bytes(xlsx_data)
        log.info(f"  edm_trends: extracted {xlsx_files[0]} ({len(xlsx_data):,} bytes)")
        return xlsx_dest
    except Exception as e:
        log.error(f"  edm_trends: ZIP extraction failed — {e}")
        return None


def download_bathing_water():
    """Download bathing water classifications for each year via BWQ API."""
    years = list(range(2015, 2026))
    # No 2020 data (COVID)
    all_rows = []
    for year in years:
        dest = RAW / f"{TODAY}_bathing_{year}.csv"
        if dest.exists():
            log.info(f"  bathing_{year}: already downloaded today, skipping")
            continue

        url = f"http://environment.data.gov.uk/data/bathing-water-quality/compliance-rBWD/slice/year/{year}.csv"
        log.info(f"  bathing_{year}: downloading…")
        resp = requests.get(url, headers=HEADERS, timeout=60)
        if resp.status_code == 200 and len(resp.content) > 100:
            dest.write_bytes(resp.content)
            log.info(f"  bathing_{year}: saved ({len(resp.content):,} bytes)")
        else:
            log.warning(f"  bathing_{year}: HTTP {resp.status_code} or empty")
        time.sleep(1)


def download_river_health():
    """Download Defra B3 river health indicator CSV."""
    # B3a = surface waters ecological status
    url = "https://oifdata.defra.gov.uk/themes/water/B3/b3a.csv"
    return download_file("river_health_b3a", url, ext="csv")


def main():
    log.info("=== Water fetch.py ===")

    download_edm_trends()
    time.sleep(2)

    download_bathing_water()
    time.sleep(2)

    download_river_health()

    log.info("✓ Water fetch complete")


if __name__ == "__main__":
    main()
