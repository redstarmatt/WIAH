"""
Environment — fetch.py

Attempts to download:
  1. DESNZ UK provisional GHG emissions CSV (annual)
  2. DEFRA air quality (AURN) summary CSV

Both sources have unstable/complex download URLs — this script tries known
patterns but falls back gracefully; transform.py uses hardcoded data if no
raw files are present.
"""

import json
import logging
import sys
import hashlib
import time
from datetime import datetime
from pathlib import Path

import requests

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "environment"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
RAW_DIR.mkdir(parents=True, exist_ok=True)


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def file_md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def try_download(key, url, suffix):
    """Try to download a URL. Returns True if new data, False if unchanged/failed."""
    today = datetime.utcnow().strftime("%Y-%m-%d")
    dest = RAW_DIR / f"{today}_{key}{suffix}"
    try:
        log.info(f"Attempting to download {key} from {url[:80]}…")
        resp = requests.get(url, headers=SESSION_HEADERS, timeout=60)
        resp.raise_for_status()
        content = resp.content
        existing = sorted(RAW_DIR.glob(f"*_{key}{suffix}"))
        if existing:
            if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                log.info(f"  {key}: unchanged.")
                return False
        dest.write_bytes(content)
        log.info(f"  Saved: {dest.name} ({len(content) // 1024} KB)")
        return True
    except Exception as e:
        log.warning(f"  {key}: download failed ({e}) — transform.py will use hardcoded data.")
        return False


def main():
    state = load_state()
    any_new = False

    # DESNZ UK provisional greenhouse gas emissions — URL changes with each release
    any_new |= try_download(
        "ghg_provisional",
        "https://assets.publishing.service.gov.uk/media/6628a8a5c04170e6b72862e3/2024-provisional-ghg-estimates-dataset.csv",
        ".csv",
    )
    time.sleep(2)

    # Ofcom/DEFRA AURN air quality annual stats — complex to automate
    # Falls back to hardcoded data in transform.py

    state["environment"] = {
        "last_checked": datetime.utcnow().isoformat(),
        "any_new_data": any_new,
    }
    save_state(state)

    if any_new:
        log.info("✓ New data downloaded.")
    else:
        log.info("✓ Using hardcoded baseline data (or already up to date).")


if __name__ == "__main__":
    main()
