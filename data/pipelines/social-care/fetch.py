"""
Social Care — fetch.py

Downloads CQC care directory CSV for latest ratings distribution.
Discharge delays and spending data are hardcoded in transform.py
(NHS England timeseries URL changes monthly; not feasible to auto-fetch).

Sources:
  1. CQC directory CSV — weekly updated, small file
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
RAW_DIR    = ROOT / "data" / "raw" / "social-care"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

# CQC publishes a weekly CSV directory. The URL contains the date, but the
# base URL redirects to the latest version. Try a recent known URL first,
# fall back to hardcoded data if unavailable.
CQC_CSV_URL = "https://www.cqc.org.uk/sites/default/files/cqc_directory.csv"

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
        # Try to download CQC directory CSV
        log.info("Downloading CQC directory CSV …")
        try:
            resp = requests.get(
                CQC_CSV_URL,
                headers=SESSION_HEADERS,
                timeout=120,
                allow_redirects=True,
            )
            resp.raise_for_status()
            content = resp.content

            filename = "cqc_directory.csv"
            dest = RAW_DIR / "{t}_{f}".format(t=today, f=filename)

            # Check if unchanged
            existing = sorted(RAW_DIR.glob("*_{f}".format(f=filename)))
            if existing:
                if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                    log.info("  CQC CSV: unchanged, skipping.")
                else:
                    dest.write_bytes(content)
                    log.info("  Saved: %s (%d KB)", dest.name, len(content) // 1024)
                    any_new = True
            else:
                dest.write_bytes(content)
                log.info("  Saved: %s (%d KB)", dest.name, len(content) // 1024)
                any_new = True

        except Exception as e:
            log.warning("  CQC CSV download failed: %s — will use hardcoded data", e)

        state["social_care"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("Already up to date (or using hardcoded data only).")

    except Exception as e:
        log.error("FETCH FAILED: %s", e)
        state.setdefault("social_care", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
