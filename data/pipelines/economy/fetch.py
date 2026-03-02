"""
Economy — fetch.py

Downloads ONS timeseries CSVs for the Economy topic page:
  1. D7G7  — CPI annual inflation rate (monthly)
  2. KAB9  — Average weekly earnings, nominal level (monthly)
  3. A3WX  — Average weekly earnings, real terms level (monthly)
  4. LF24  — Employment rate 16–64 (monthly, 3-month rolling)
  5. MGSX  — Unemployment rate 16+ (monthly, 3-month rolling)
  6. LF2S  — Economic inactivity rate 16–64 (monthly, 3-month rolling)
  7. LZVB  — Output per hour worked, index (quarterly)
  8. CRXX  — Real household disposable income per head (quarterly)

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
RAW_DIR    = ROOT / "data" / "raw" / "economy"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

SESSION_HEADERS = {
    "User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)",
}

ONS_BASE = "https://www.ons.gov.uk/generator?format=csv&uri="

SOURCES = {
    "cpi_annual_rate": f"{ONS_BASE}/economy/inflationandpriceindices/timeseries/d7g7/mm23",
    "awe_nominal_level": f"{ONS_BASE}/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms",
    "awe_real_level": f"{ONS_BASE}/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/a3wx/emp",
    "employment_rate": f"{ONS_BASE}/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms",
    "unemployment_rate": f"{ONS_BASE}/employmentandlabourmarket/peoplenotinwork/unemployment/timeseries/mgsx/lms",
    "inactivity_rate": f"{ONS_BASE}/employmentandlabourmarket/peoplenotinwork/economicinactivity/timeseries/lf2s/lms",
    "productivity_index": f"{ONS_BASE}/employmentandlabourmarket/peopleinwork/labourproductivity/timeseries/lzvb/prdy",
    "rhdi_per_head": f"{ONS_BASE}/economy/grossdomesticproductgdp/timeseries/crxx/ukea",
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
                    time.sleep(1)
                    continue

            dest.write_bytes(content)
            log.info(f"  Saved: {dest.name} ({len(content) // 1024} KB)")
            any_new = True

            # Rate-limit: ONS returns 429 if requests are too fast
            time.sleep(2)

        state["economy"] = {
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
        state.setdefault("economy", {})["last_error"] = {
            "time": datetime.utcnow().isoformat(),
            "message": str(e),
        }
        save_state(state)
        sys.exit(1)


if __name__ == "__main__":
    main()
