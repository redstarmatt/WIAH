"""
Teacher Workforce — fetch.py

Downloads teacher vacancy rates and pupil-teacher ratios from DfE
Explore Education Statistics.

Sources:
  - DfE, School Workforce in England
  - https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england
"""

import json
import logging
import hashlib
from datetime import datetime
from pathlib import Path

import requests

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "teacher-workforce"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

BASE_URL = "https://explore-education-statistics.service.gov.uk/data-catalogue/data-set/{uuid}/csv"

DATASETS = {
    "teacher_vacancies": {
        "uuid": "0955be83-1b3c-4834-affa-543deb58dcb0",
        "desc": "Teacher vacancies (national/regional/LA)",
    },
    "pupil_teacher_ratios": {
        "uuid": "fa0eabd3-b071-4099-bdca-ae7f895f0270",
        "desc": "Pupil-teacher ratios (national/regional/LA)",
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

    for key, info in DATASETS.items():
        url = BASE_URL.format(uuid=info["uuid"])
        log.info("Downloading %s: %s", key, info["desc"])
        resp = session.get(url, timeout=60)
        resp.raise_for_status()
        data = resp.content
        checksum = md5(data)

        if checksum == state.get(f"{key}_md5"):
            log.info("  %s unchanged. Skipping.", key)
            continue

        any_new = True
        out_path = RAW_DIR / f"{key}.csv"
        out_path.write_bytes(data)
        log.info("  Saved %s (%d bytes)", out_path, len(data))

        state[f"{key}_md5"] = checksum

    state["last_fetch"] = datetime.now().isoformat()
    state["any_new_data"] = any_new
    save_state(state)

    log.info("Fetch complete. New data: %s", any_new)


if __name__ == "__main__":
    main()
