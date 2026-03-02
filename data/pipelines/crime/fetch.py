"""
Crime — fetch.py

Downloads crime and justice data from gov.uk:
  1. Home Office crime outcomes (charge rates, funnel data)
  2. MOJ criminal court statistics (Crown Court backlog)
  3. MOJ prison population (monthly population + capacity)
  4. MOJ prison snapshot (current establishment-level detail)

All files are ODS format from stable gov.uk asset URLs.
"""

import json
import logging
import sys
import hashlib
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "crime"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

# Direct asset URLs — gov.uk publishing platform, stable links
SOURCES = {
    "outcomes_ods": (
        "https://assets.publishing.service.gov.uk/media/"
        "6890c7aee8ba9507fc1b09cc/outcomes-mar25-tables-240725.ods"
    ),
    "court_publication_ods": (
        "https://assets.publishing.service.gov.uk/media/"
        "6943d254501cdd438f4cf59e/ccsq_accessible_publication_tables_2025Q3.ods"
    ),
    "prison_monthly_ods": (
        "https://assets.publishing.service.gov.uk/media/"
        "6964d8965534c732221e0d5b/prison-pop-december-2025.ods"
    ),
    "prison_snapshot_ods": (
        "https://assets.publishing.service.gov.uk/media/"
        "6978d8c475d4437096552064/prison-population-31-Dec-2025.ods"
    ),
}

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
RAW_DIR.mkdir(parents=True, exist_ok=True)


# ── Helpers ────────────────────────────────────────────────────────────────────

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


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    state = load_state()
    any_new = False
    today = datetime.utcnow().strftime("%Y-%m-%d")

    try:
        for key, url in SOURCES.items():
            filename = url.split("/")[-1].split("?")[0]
            dest = RAW_DIR / f"{today}_{filename}"

            log.info(f"Downloading {key} …")
            resp = requests.get(url, headers=SESSION_HEADERS, timeout=120)
            resp.raise_for_status()
            content = resp.content

            # Check if unchanged from any existing download of same file
            existing = sorted(RAW_DIR.glob(f"*_{filename}"))
            if existing:
                if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                    log.info(f"  {key}: unchanged, skipping.")
                    continue

            dest.write_bytes(content)
            log.info(f"  Saved: {dest.name} ({len(content) // 1024} KB)")
            any_new = True

        state["crime"] = {
            "last_checked": datetime.utcnow().isoformat(),
            "files": dict(SOURCES),
            "any_new_data": any_new,
        }
        save_state(state)

        if any_new:
            log.info("✓ New data downloaded. Run transform.py to update JSON.")
        else:
            log.info("✓ Already up to date.")

    except Exception as e:
        log.error(f"FETCH FAILED: {e}")
        state.setdefault("crime", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
