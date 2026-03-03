"""
fetch.py — Download DfE LEO Graduate and Postgraduate Outcomes data.

Source: DfE Explore Education Statistics — LEO Graduate Outcomes
Two datasets:
  1. Outcomes and earnings data (44MB CSV) — UUID 8665d750-93c9-4d2b-a94f-c47fd2a495c7
  2. Real terms earnings data (481KB CSV) — UUID 881180a5-faf0-4c32-b454-5bbe492da362
"""

import json
import logging
import hashlib
import requests
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "graduate-outcomes"
STATE_FILE = RAW_DIR / "_state.json"

BASE_URL = "https://explore-education-statistics.service.gov.uk/data-catalogue/data-set"

DATASETS = {
    "outcomes": {
        "uuid": "8665d750-93c9-4d2b-a94f-c47fd2a495c7",
        "filename": "outcomes_earnings.csv",
        "label": "Outcomes and earnings data",
    },
    "real_terms": {
        "uuid": "881180a5-faf0-4c32-b454-5bbe492da362",
        "filename": "real_terms_earnings.csv",
        "label": "Real terms earnings data",
    },
}


def md5(data):
    return hashlib.md5(data).hexdigest()


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())

    any_new = False

    for key, ds in DATASETS.items():
        url = f"{BASE_URL}/{ds['uuid']}/csv"
        log.info(f"Downloading {ds['label']} ({ds['uuid']})...")
        resp = requests.get(url, timeout=180, stream=True)
        if resp.status_code != 200:
            log.error(f"Failed: HTTP {resp.status_code} for {ds['label']}")
            raise SystemExit(1)

        content = resp.content
        log.info(f"  Got {len(content):,} bytes")

        new_hash = md5(content)
        old_hash = state.get(key, {}).get("md5")

        if new_hash == old_hash:
            log.info(f"  No change (MD5 match) for {ds['label']}")
            continue

        any_new = True
        datestamp = datetime.now().strftime("%Y%m%d")
        out = RAW_DIR / f"{ds['filename'].replace('.csv', '')}_{datestamp}.csv"
        out.write_bytes(content)
        stable = RAW_DIR / ds["filename"]
        stable.write_bytes(content)
        log.info(f"  Saved to {out.name} + {stable.name}")

        state[key] = {
            "md5": new_hash,
            "retrieved": datetime.now().isoformat(),
            "file": out.name,
        }

    state["graduate_outcomes"] = {"any_new_data": any_new}
    STATE_FILE.write_text(json.dumps(state, indent=2))
    log.info(f"Done. New data: {any_new}")


if __name__ == "__main__":
    main()
