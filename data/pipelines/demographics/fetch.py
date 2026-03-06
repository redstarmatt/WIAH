#!/usr/bin/env python3
"""
Demographics — fetch.py

Downloads ONS demographic data:
  1. Birth summary tables (live births, TFR, CBR), England and Wales
  2. Mid-year population estimates time series, England (ENPOP)
  3. Mid-year population estimates time series, UK (UKPOP)

Sources:
  ONS, Births summary tables: /peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables
  ONS, Population estimates time series: /peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries
"""

import hashlib
import requests
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
RAW  = ROOT / "data" / "raw" / "demographics"
RAW.mkdir(parents=True, exist_ok=True)

HEADERS = {"User-Agent": "WIAH-DataPipeline/1.0 (whatisactuallyhappening.uk; open data research)"}

SOURCES = {
    "births_summary": (
        "https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/"
        "birthsdeathsandmarriages/livebirths/datasets/birthsummarytables/"
        "2022/birthssummary2022refreshedpopulations.xlsx"
    ),
    # ONS time series CSV generator — stable endpoint, updates with each release
    "population_england": (
        "https://www.ons.gov.uk/generator?format=csv&uri=/peoplepopulationandcommunity/"
        "populationandmigration/populationestimates/timeseries/enpop/pop"
    ),
    "population_uk": (
        "https://www.ons.gov.uk/generator?format=csv&uri=/peoplepopulationandcommunity/"
        "populationandmigration/populationestimates/timeseries/ukpop/pop"
    ),
}


def fetch_file(name: str, url: str, ext: str = "xlsx"):
    dest = RAW / f"{name}.{ext}"
    try:
        r = requests.get(url, timeout=60, headers=HEADERS)
        r.raise_for_status()
    except Exception as e:
        print(f"  ERROR fetching {name}: {e}")
        return

    new_md5 = hashlib.md5(r.content).hexdigest()
    if dest.exists():
        if hashlib.md5(dest.read_bytes()).hexdigest() == new_md5:
            print(f"  SKIP (unchanged): {dest.name}")
            return

    dest.write_bytes(r.content)
    print(f"  SAVED: {dest.name}  ({len(r.content) // 1024} KB)")


if __name__ == "__main__":
    print("Fetching demographics data…")
    fetch_file("births_summary", SOURCES["births_summary"], ext="xlsx")
    fetch_file("population_england", SOURCES["population_england"], ext="csv")
    fetch_file("population_uk", SOURCES["population_uk"], ext="csv")
    print(f"  RAW dir: {RAW}")
    print("Done.")
