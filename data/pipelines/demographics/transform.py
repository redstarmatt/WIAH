#!/usr/bin/env python3
"""
Demographics — transform.py

Transforms ONS demographic downloads into demographics.json:
  - Live births time series (TFR, crude birth rate), England and Wales
  - Mid-year population estimates, England and UK (1971–present)

Table_1 (births) structure:
  Row 8:  column headers
  Row 9+: data rows (year descending, 2022 down to 1838)
  Col 0:  Year
  Col 1:  Number of live births (Total)
  Col 6:  Total Fertility Rate (TFR)
  Col 8:  Crude Birth Rate (CBR): all live births per 1,000 population

Population CSV structure (ONS time series generator):
  Rows 0–7: metadata (title, CDID, source, etc.)
  Row 8+:   "year","value" (as quoted strings)
"""

import json
from datetime import date
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[3]
RAW  = ROOT / "data" / "raw" / "demographics"
OUT  = ROOT / "site" / "public" / "data" / "demographics"
OUT.mkdir(parents=True, exist_ok=True)

FALLBACK_BIRTHS = [
    {"year": 1938, "births": 621000, "birthRate": 15.1, "tfr": 1.87},
    {"year": 1945, "births": 680000, "birthRate": 16.1, "tfr": 2.08},
    {"year": 1950, "births": 818000, "birthRate": 16.8, "tfr": 2.18},
    {"year": 1955, "births": 789000, "birthRate": 15.8, "tfr": 2.21},
    {"year": 1960, "births": 918000, "birthRate": 17.9, "tfr": 2.72},
    {"year": 1964, "births": 876000, "birthRate": 18.5, "tfr": 2.93},
    {"year": 1965, "births": 863000, "birthRate": 18.1, "tfr": 2.86},
    {"year": 1970, "births": 784000, "birthRate": 16.1, "tfr": 2.43},
    {"year": 1975, "births": 603000, "birthRate": 12.5, "tfr": 1.81},
    {"year": 1980, "births": 656000, "birthRate": 13.4, "tfr": 1.89},
    {"year": 1985, "births": 641000, "birthRate": 13.3, "tfr": 1.79},
    {"year": 1990, "births": 666000, "birthRate": 13.9, "tfr": 1.83},
    {"year": 1995, "births": 648000, "birthRate": 12.5, "tfr": 1.72},
    {"year": 2000, "births": 679000, "birthRate": 11.4, "tfr": 1.64},
    {"year": 2005, "births": 722000, "birthRate": 12.0, "tfr": 1.78},
    {"year": 2008, "births": 794000, "birthRate": 13.0, "tfr": 1.97},
    {"year": 2010, "births": 724000, "birthRate": 13.1, "tfr": 1.92},
    {"year": 2012, "births": 813000, "birthRate": 12.8, "tfr": 1.94},
    {"year": 2013, "births": 779000, "birthRate": 12.3, "tfr": 1.85},
    {"year": 2014, "births": 776000, "birthRate": 12.2, "tfr": 1.83},
    {"year": 2015, "births": 778000, "birthRate": 12.1, "tfr": 1.82},
    {"year": 2016, "births": 775000, "birthRate": 12.1, "tfr": 1.81},
    {"year": 2017, "births": 755000, "birthRate": 11.7, "tfr": 1.76},
    {"year": 2018, "births": 731000, "birthRate": 11.3, "tfr": 1.70},
    {"year": 2019, "births": 712000, "birthRate": 11.0, "tfr": 1.65},
    {"year": 2020, "births": 614000, "birthRate": 9.4,  "tfr": 1.58},
    {"year": 2021, "births": 624000, "birthRate": 9.5,  "tfr": 1.62},
    {"year": 2022, "births": 606000, "birthRate": 9.3,  "tfr": 1.49},
    {"year": 2023, "births": 591000, "birthRate": 9.1,  "tfr": 1.44},
]


def safe_float(val):
    try:
        s = str(val).replace(",", "").strip()
        if s in ("nan", "[x]", "[z]", "", "NaN"):
            return None
        return float(s)
    except Exception:
        return None


# ── Births ────────────────────────────────────────────────────────────────────

def parse_births() -> list[dict]:
    xlsx_path = RAW / "births_summary.xlsx"
    if not xlsx_path.exists():
        print("  Births file not found — using fallback")
        return FALLBACK_BIRTHS

    try:
        xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
        if "Table_1" not in xl.sheet_names:
            print("  Table_1 not found — using fallback")
            return FALLBACK_BIRTHS

        df = pd.read_excel(xlsx_path, sheet_name="Table_1", header=None, engine="openpyxl")
        rows = []
        for i in range(9, len(df)):
            row = df.iloc[i]
            yr = safe_float(row.iloc[0])
            if yr is None:
                continue
            yr_int = int(yr)
            if not (1838 <= yr_int <= 2030):
                continue
            births = safe_float(row.iloc[1])
            tfr    = safe_float(row.iloc[6])
            cbr    = safe_float(row.iloc[8])
            if births and births > 1000:
                rows.append({
                    "year":      yr_int,
                    "births":    int(births),
                    "birthRate": round(cbr, 1) if cbr is not None else None,
                    "tfr":       round(tfr, 2) if tfr is not None else None,
                })
        rows.sort(key=lambda x: x["year"])
        print(f"  Births: {len(rows)} rows  ({rows[0]['year']}–{rows[-1]['year']})")
        return rows if len(rows) > 10 else FALLBACK_BIRTHS

    except Exception as e:
        print(f"  Error parsing births: {e}")
        return FALLBACK_BIRTHS


# ── Population estimates ──────────────────────────────────────────────────────

def parse_population_csv(csv_path: Path, label: str) -> list[dict]:
    """
    Parse ONS time series generator CSV.
    Format: 8 metadata rows, then "year","value" rows as quoted strings.
    """
    if not csv_path.exists():
        print(f"  {label}: file not found — skipping")
        return []

    rows = []
    with open(csv_path, encoding="utf-8") as f:
        for i, line in enumerate(f):
            if i < 8:
                continue  # skip metadata
            parts = line.strip().replace('"', "").split(",")
            if len(parts) < 2:
                continue
            try:
                year  = int(parts[0].strip())
                value = int(parts[1].strip().replace(",", ""))
                if 1900 <= year <= 2100:
                    rows.append({"year": year, "population": value})
            except (ValueError, TypeError):
                continue

    if rows:
        print(f"  {label}: {len(rows)} rows  ({rows[0]['year']}–{rows[-1]['year']})")
    return rows


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=== Demographics transform.py ===")

    births = parse_births()
    pop_england = parse_population_csv(RAW / "population_england.csv", "Population England")
    pop_uk      = parse_population_csv(RAW / "population_uk.csv",      "Population UK")

    output = {
        "topic":       "demographics",
        "lastUpdated": date.today().isoformat(),
        "births": births,
        "population": {
            "england": pop_england,
            "uk":      pop_uk,
        },
        "metadata": {
            "sources": [
                {
                    "name":      "ONS",
                    "dataset":   "Birth Summary Tables, England and Wales",
                    "url":       "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables",
                    "frequency": "annual",
                },
                {
                    "name":      "ONS",
                    "dataset":   "Population estimates time series (ENPOP, UKPOP)",
                    "url":       "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries/enpop/pop",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Live births, crude birth rate per 1,000 population, and total fertility rate (TFR), "
                "England and Wales. Population estimates are ONS mid-year estimates; England series "
                "from 1971, UK series from 1971."
            ),
            "knownIssues": [
                "TFR below 2.1 is sub-replacement. England and Wales record low TFR was 1.44 in 2023.",
                "Births data for pre-1971 uses fallback summary figures; mid-year pop estimates start 1971.",
            ],
        },
    }

    out_path = OUT / "demographics.json"
    out_path.write_text(json.dumps(output, indent=2))
    print(f"  Written: {out_path}")
    print("Done.")
