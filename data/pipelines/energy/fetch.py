"""
Energy — fetch.py

Downloads ONS timeseries CSVs for the Energy topic page:
  1. D7DT — CPI Electricity price index (2015=100, monthly)
  2. D7DU — CPI Gas price index (2015=100, monthly)

All from ONS timeseries generator — stable CSV endpoints.
"""

import json
import logging
import sys
import hashlib
import time
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "energy"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

ONS_BASE = "https://www.ons.gov.uk/generator?format=csv&uri="

SOURCES = {
    "cpi_electricity": "{base}/economy/inflationandpriceindices/timeseries/d7dt/mm23".format(base=ONS_BASE),
    "cpi_gas": "{base}/economy/inflationandpriceindices/timeseries/d7du/mm23".format(base=ONS_BASE),
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


def file_md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    any_new = False
    today = datetime.utcnow().strftime("%Y-%m-%d")

    try:
        for key, url in SOURCES.items():
            filename = "{k}.csv".format(k=key)
            dest = RAW_DIR / "{t}_{f}".format(t=today, f=filename)

            log.info("Downloading %s …", key)
            resp = requests.get(url, headers=SESSION_HEADERS, timeout=120)
            resp.raise_for_status()
            content = resp.content

            # Check if unchanged from any existing download
            existing = sorted(RAW_DIR.glob("*_{f}".format(f=filename)))
            if existing:
                if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                    log.info("  %s: unchanged, skipping.", key)
                    time.sleep(1)
                    continue

            dest.write_bytes(content)
            log.info("  Saved: %s (%d KB)", dest.name, len(content) // 1024)
            any_new = True

            # Rate-limit: ONS returns 429 if requests are too fast
            time.sleep(2)

        state["energy"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "files": dict(SOURCES),
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("Already up to date.")

    except Exception as e:
        log.error("FETCH FAILED: %s", e)
        state.setdefault("energy", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
