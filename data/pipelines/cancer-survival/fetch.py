"""
fetch.py — Download ONS cancer survival data for England.

Source: ONS "Cancer survival in England - adults diagnosed"
Latest data covers patients diagnosed 2013-2017 (published August 2019).
Downloads: the latest comprehensive Excel file + the methodology backseries.

Note: Cancer survival data has a ~2-year publication lag. The trend data
is still highly informative showing steady improvement over decades.
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
RAW_DIR = ROOT / "data" / "raw" / "cancer-survival"
STATE_FILE = RAW_DIR / "_state.json"

# Latest comprehensive file (2013-2017) — includes all cancer sites, age groups, stages
LATEST_URL = "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20132017/adultcancersurvivaltables.xlsx"

# Historical editions — each covers a 5-year rolling window
EDITIONS = [
    ("2003-2007", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20032007/45england200307webreleasefigureandtablesamendedicdtablefina_tcm77-239432.xls"),
    ("2004-2008", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20042008/cancersurvivalengland20042008200_tcm77-226138.xls"),
    ("2005-2009", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20052009/cancersurvivalinengland20052009tablesandfiguresfinalv2_tcm77-240954.xls"),
    ("2006-2010", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20062010/cancersurvivalinenglandpatientsdiagnosed2006to2010andfollowedupto2011_tcm77-283629.xls"),
    ("2007-2011", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20072011/survivalinengland20072011metadataandtablesfinal_tcm77-333316.xls"),
    ("2008-2012", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20082012/cancersurvivalinengland20082012_tcm77-382470.xls"),
    ("2009-2013", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20092014/referencetablefinal_tcm77-424415.xls"),
    ("2010-2014", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20102014/finalreferencetablev2.xls"),
    ("2011-2015", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20112015/adultcancersurvivalcorrectionfinal.xls"),
    ("2012-2016", "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20122016/cancersurvivalinadultsreferencetables.xlsx"),
    ("2013-2017", LATEST_URL),
]

# Backseries with consistent methodology (2006-2015)
BACKSERIES_URL = "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed/20062015newbackseriesduetomethodologychange/impactpaperbackseriestables.xlsx"


def md5(data):
    return hashlib.md5(data).hexdigest()


def download(url, label):
    log.info(f"Downloading {label}...")
    resp = requests.get(url, timeout=60)
    if resp.status_code != 200:
        log.warning(f"  Failed ({resp.status_code}) for {label}")
        return None
    log.info(f"  Got {len(resp.content):,} bytes")
    return resp.content


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    # Download latest comprehensive file
    content = download(LATEST_URL, "latest (2013-2017)")
    if content is None:
        log.error("Failed to download latest cancer survival data")
        raise SystemExit(1)

    # Download backseries
    backseries = download(BACKSERIES_URL, "backseries (2006-2015)")

    # MD5 dedup on latest
    new_hash = md5(content)
    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text())
    old_hash = state.get("cancer_survival", {}).get("md5")

    if new_hash == old_hash:
        log.info("No change in cancer survival data (MD5 match).")
        state["cancer_survival"]["any_new_data"] = False
        STATE_FILE.write_text(json.dumps(state, indent=2))
        return

    # Save latest
    datestamp = datetime.now().strftime("%Y%m%d")
    out = RAW_DIR / f"cancer_survival_latest_{datestamp}.xlsx"
    out.write_bytes(content)
    stable = RAW_DIR / "cancer_survival_latest.xlsx"
    stable.write_bytes(content)
    log.info(f"Saved latest to {out.name}")

    # Save backseries
    if backseries:
        bs_path = RAW_DIR / "cancer_survival_backseries.xlsx"
        bs_path.write_bytes(backseries)
        log.info(f"Saved backseries to {bs_path.name}")

    state["cancer_survival"] = {
        "md5": new_hash,
        "retrieved": datetime.now().isoformat(),
        "file": out.name,
        "any_new_data": True,
    }
    STATE_FILE.write_text(json.dumps(state, indent=2))
    log.info("Done.")


if __name__ == "__main__":
    main()
