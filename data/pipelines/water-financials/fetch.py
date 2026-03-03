"""
Water Financials pipeline — fetch
Downloads Ofwat historic dividends and long-term cost data.
"""

import hashlib
import json
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent.parent
RAW = ROOT / "data" / "raw" / "water-financials"
RAW.mkdir(parents=True, exist_ok=True)
STATE_FILE = RAW / "_state.json"

HEADERS = {"User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk)"}

DIVIDENDS_URL = "https://www.ofwat.gov.uk/wp-content/uploads/2024/12/Historic-dividends-since-privatisation.xlsx"
COSTS_URL = "https://www.ofwat.gov.uk/wp-content/uploads/2022/11/Long-term-data-series-v5-Nov-2025-Published.xlsx"


def download(url, label):
    # type: (str, str) -> bool
    dest = RAW / os.path.basename(url)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        data = urllib.request.urlopen(req, timeout=60).read()
    except Exception as e:
        print("  {}: FAILED - {}".format(label, e), file=sys.stderr)
        return False

    md5 = hashlib.md5(data).hexdigest()

    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())

    old_md5 = state.get(label, {}).get("md5")
    if md5 == old_md5:
        print("  {}: unchanged (md5={})".format(label, md5[:8]))
        return False

    dest.write_bytes(data)
    state[label] = {"md5": md5, "file": dest.name}
    STATE_FILE.write_text(json.dumps(state, indent=2))
    print("  {}: downloaded {} bytes (md5={})".format(label, len(data), md5[:8]))
    return True


if __name__ == "__main__":
    print("=== Water Financials: fetch ===")
    d1 = download(DIVIDENDS_URL, "dividends")
    d2 = download(COSTS_URL, "costs")
    if d1 or d2:
        print("Done.")
    else:
        print("No new data.")
