"""
GDP + Public Debt — fetch.py

Downloads ONS time series CSVs:
  1. GDP quarterly growth (QoQ) — series IHYQ
  2. Public sector net debt as % of GDP — series HF6X

Sources:
  - ONS, Gross Domestic Product quarterly estimates
  - ONS, Public Sector Finances
"""

import os
import sys
import json
import logging
import hashlib
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "gdp"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

DOWNLOADS = {
    "gdp_qoq": {
        "url": "https://www.ons.gov.uk/generator?format=csv&uri=/economy/grossdomesticproductgdp/timeseries/ihyq/pn2",
        "desc": "GDP quarter-on-quarter growth (IHYQ)",
    },
    "debt_pct": {
        "url": "https://www.ons.gov.uk/generator?format=csv&uri=/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6x/pusf",
        "desc": "Public sector net debt as % of GDP (HF6X)",
    },
}

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


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    session = requests.Session()
    session.headers.update(SESSION_HEADERS)

    any_new = False

    for key, info in DOWNLOADS.items():
        log.info("Downloading %s: %s", key, info["desc"])
        resp = session.get(info["url"], timeout=30)
        resp.raise_for_status()
        data = resp.content
        checksum = md5(data)

        if checksum == state.get(f"{key}_md5"):
            log.info("  %s unchanged (MD5 match). Skipping.", key)
            continue

        any_new = True
        today = datetime.now().strftime("%Y%m%d")
        filename = f"{key}_{today}.csv"
        out_path = RAW_DIR / filename
        out_path.write_bytes(data)
        log.info("  Saved %s (%d bytes)", out_path, len(data))

        # Also save as stable name
        stable_path = RAW_DIR / f"{key}.csv"
        stable_path.write_bytes(data)

        state[f"{key}_md5"] = checksum
        state[f"{key}_file"] = filename

    state["last_fetch"] = datetime.now().isoformat()
    state["any_new_data"] = any_new
    save_state(state)

    log.info("Fetch complete. New data: %s", any_new)


if __name__ == "__main__":
    main()
