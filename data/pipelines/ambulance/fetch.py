"""
Ambulance — fetch.py

Discovers and downloads the latest NHS England Ambulance Quality Indicators data.
Published monthly at:
  https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/

Key metrics:
  - Category 1 mean response time (immediately life-threatening)
  - Category 2 mean response time (emergency — target: 18 minutes mean)
"""

import json
import logging
import re
import sys
import hashlib
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "ambulance"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

INDEX_URL = "https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/"
SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
RAW_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ─────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def file_md5(path: Path) -> str:
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def get(url: str, **kwargs) -> requests.Response:
    r = requests.get(url, headers=SESSION_HEADERS, timeout=60, **kwargs)
    r.raise_for_status()
    return r


# ── Discovery ───────────────────────────────────────────────────────────────────

def discover_data_urls() -> dict:
    """
    Scrape the AQI index page (NHS England WordPress site — static HTML, no JS rendering needed).
    Returns the main AmbSYS timeseries XLSX URL.
    """
    log.info(f"Discovering latest data from {INDEX_URL}")
    headers = dict(SESSION_HEADERS)
    headers["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    resp = requests.get(INDEX_URL, headers=headers, timeout=30)
    resp.raise_for_status()
    html = resp.text

    urls = {}

    # AmbSYS timeseries XLSX — covers 2017–present for all trusts
    # URL pattern: .../wp-content/uploads/sites/2/YYYY/MM/AmbSYS-Time-Series-until-YYYYMMDD-*.xlsx
    ts_match = re.search(
        r'href="(https://www\.england\.nhs\.uk/statistics/wp-content/uploads/[^"]*AmbSYS[^"]*Time[^"]*Series[^"]*\.xlsx)"',
        html, re.IGNORECASE
    )
    if not ts_match:
        # Broader fallback
        ts_match = re.search(
            r'href="(https://www\.england\.nhs\.uk/statistics/wp-content/uploads/[^"]*AmbSYS[^"]*\.xlsx)"',
            html, re.IGNORECASE
        )
    if ts_match:
        urls["timeseries_xlsx"] = ts_match.group(1)
        log.info(f"  timeseries_xlsx -> {urls['timeseries_xlsx']}")

    # Also get the CSV version of the timeseries if available
    csv_match = re.search(
        r'href="(https://www\.england\.nhs\.uk/statistics/wp-content/uploads/[^"]*AmbSYS[^"]*Time[^"]*Series[^"]*\.csv)"',
        html, re.IGNORECASE
    )
    if csv_match:
        urls["timeseries_csv"] = csv_match.group(1)
        log.info(f"  timeseries_csv -> {urls['timeseries_csv']}")

    if not urls:
        # Log available links for debugging
        all_xlsx = re.findall(r'href="(https://www\.england\.nhs\.uk/statistics/wp-content/uploads/[^"]*\.(xlsx|csv))"', html, re.I)
        log.warning(f"  Available XLSX/CSV files on page: {[u[0] for u in all_xlsx[:10]]}")
        raise RuntimeError(
            "Could not find AmbSYS timeseries file. "
            "NHS England page structure may have changed — check the URL above."
        )

    return urls


def download_file(url: str, dest_path: Path, label: str) -> bool:
    log.info(f"Downloading {label} …")
    resp = get(url, stream=True)
    content = resp.content

    if dest_path.exists():
        if file_md5(dest_path) == hashlib.md5(content).hexdigest():
            log.info(f"  {label}: unchanged, skipping.")
            return False

    dest_path.write_bytes(content)
    log.info(f"  Saved: {dest_path} ({len(content) // 1024} KB)")
    return True


# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    any_new = False

    try:
        file_urls = discover_data_urls()

        today = datetime.utcnow().strftime("%Y-%m-%d")

        for key, url in file_urls.items():
            if key == "latest_publication":
                continue  # not a data file
            filename = url.split("/")[-1].split("?")[0]
            # Stamp with today's date so we keep history
            dest = RAW_DIR / f"{today}_{filename}"
            # Check if we already have a file with this name (any date prefix)
            existing = [f for f in RAW_DIR.glob(f"*_{filename}") if f != dest]
            if existing:
                # Compare MD5 of latest existing against the download
                resp = requests.get(url, headers=SESSION_HEADERS, timeout=60)
                resp.raise_for_status()
                content = resp.content
                if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                    log.info(f"  {key}: no change since last download.")
                    continue
                dest.write_bytes(content)
                log.info(f"  {key}: updated → {dest} ({len(content) // 1024} KB)")
                any_new = True
            else:
                updated = download_file(url, dest, label=key)
                if updated:
                    any_new = True

        state["ambulance"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "files":        {k: v for k, v in file_urls.items() if k != "latest_publication"},
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("✓ New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("✓ Already up to date.")

    except Exception as e:
        log.error(f"FETCH FAILED: {e}")
        state.setdefault("ambulance", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
