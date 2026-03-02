"""
Education — fetch.py

Downloads education data from DfE Explore Education Statistics:
  1. Pupil absence in schools (persistent absence, overall absence)
  2. KS4 disadvantage gap index (national time series)
  3. KS4 national characteristics (Attainment 8 by FSM/disadvantage)
  4. EHCP requests, assessments and timeliness (2014–2023)

All files are CSV downloads from the DfE data catalogue.
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
RAW_DIR    = ROOT / "data" / "raw" / "education"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

# DfE Explore Education Statistics CSV download URLs
DFE_BASE = "https://explore-education-statistics.service.gov.uk/data-catalogue/data-set"

SOURCES = {
    "absence_csv": f"{DFE_BASE}/37b455db-88c4-493b-8ff5-4383f0ce3c5d/csv",
    "ks4_gap_csv": f"{DFE_BASE}/dbff4e55-5b10-44bc-be2b-23d9d68e0f98/csv",
    "ks4_chars_csv": f"{DFE_BASE}/e4fad812-8d78-4815-bf9f-2f749e072894/csv",
    "ehcp_csv": f"{DFE_BASE}/0efe0d40-2c9f-4352-9658-d7439c99aff1/csv",
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
            filename = f"{key}.csv"
            dest = RAW_DIR / f"{today}_{filename}"

            log.info(f"Downloading {key} …")
            resp = requests.get(url, headers=SESSION_HEADERS, timeout=120)
            resp.raise_for_status()
            content = resp.content

            # Check if unchanged from any existing download
            existing = sorted(RAW_DIR.glob(f"*_{filename}"))
            if existing:
                if file_md5(existing[-1]) == hashlib.md5(content).hexdigest():
                    log.info(f"  {key}: unchanged, skipping.")
                    continue

            dest.write_bytes(content)
            log.info(f"  Saved: {dest.name} ({len(content) // 1024} KB)")
            any_new = True

        state["education"] = {
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
        state.setdefault("education", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
