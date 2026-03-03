"""
Broadband & Digital — fetch.py

Attempts to download Ofcom Connected Nations data.
Falls back gracefully; transform.py uses hardcoded data.
"""

import json
import logging
import hashlib
import time
from datetime import datetime
from pathlib import Path

import requests

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "broadband"
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
    today = datetime.utcnow().strftime("%Y-%m-%d")
    dest = RAW_DIR / f"{today}_{key}{suffix}"
    try:
        log.info(f"Attempting {key}…")
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
        log.warning(f"  {key}: failed ({e}) — using hardcoded data.")
        return False


def main():
    state = load_state()
    any_new = False

    # Ofcom Connected Nations interactive report data — URL varies by year
    # Falls back to hardcoded data in transform.py
    any_new |= try_download(
        "connected_nations",
        "https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations/connected-nations-2024/data",
        ".csv",
    )

    state["broadband"] = {
        "last_checked": datetime.utcnow().isoformat(),
        "any_new_data": any_new,
    }
    save_state(state)
    log.info("✓ Fetch complete (hardcoded data will be used for reliability).")


if __name__ == "__main__":
    main()
