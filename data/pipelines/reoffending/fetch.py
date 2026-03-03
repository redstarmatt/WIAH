"""
fetch.py — Download MOJ Proven Reoffending Statistics.

Source: Ministry of Justice — Proven Reoffending Statistics
URL: https://www.gov.uk/government/statistics/proven-reoffending-statistics-january-to-march-2024
Format: Excel (.xlsx) — overall data tool covering Apr 2012 to Mar 2024
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
RAW_DIR = ROOT / "data" / "raw" / "reoffending"
STATE_FILE = RAW_DIR / "_state.json"

# Overall data tool — covers Apr 2012 to Mar 2024
OVERALL_URL = "https://assets.publishing.service.gov.uk/media/69777877f909df76c5e71f1e/PRSQ_overall_data_tool_apr12_mar24.xlsx"

# Fallback: 3-monthly ODS file
THREE_MONTHLY_URL = "https://assets.publishing.service.gov.uk/media/6977921c3fd50ac304b79767/proven-reoffending_jan24_mar24_3_monthly.ods"


def md5(data):
    return hashlib.md5(data).hexdigest()


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    log.info(f"Downloading overall data tool...")
    resp = requests.get(OVERALL_URL, timeout=120)
    if resp.status_code != 200:
        log.error(f"Failed to download overall data tool: HTTP {resp.status_code}")
        raise SystemExit(1)

    content = resp.content
    log.info(f"Downloaded {len(content):,} bytes")

    # MD5 dedup
    new_hash = md5(content)
    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())
    old_hash = state.get("reoffending", {}).get("md5")

    if new_hash == old_hash:
        log.info("No change (MD5 match). Skipping.")
        state["reoffending"]["any_new_data"] = False
        STATE_FILE.write_text(json.dumps(state, indent=2))
        return

    datestamp = datetime.now().strftime("%Y%m%d")
    out_path = RAW_DIR / f"reoffending_overall_{datestamp}.xlsx"
    out_path.write_bytes(content)
    stable = RAW_DIR / "reoffending_overall.xlsx"
    stable.write_bytes(content)
    log.info(f"Saved to {out_path.name} + {stable.name}")

    state["reoffending"] = {
        "md5": new_hash,
        "retrieved": datetime.now().isoformat(),
        "file": out_path.name,
        "any_new_data": True,
    }
    STATE_FILE.write_text(json.dumps(state, indent=2))
    log.info("Done.")


if __name__ == "__main__":
    main()
