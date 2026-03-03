"""
Transport — transform.py

Processes:
  1. BUS01 ODS — DfT local bus passenger journeys by region/year
  2. Hardcoded ORR rail PPM (Public Performance Measure) data

Outputs data/output/transport/transport.json
"""

import json
import logging
import re
from pathlib import Path
from typing import List, Dict, Optional, Any

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "transport"
OUTPUT_DIR = ROOT / "data" / "output" / "transport"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── Hardcoded Rail Data ────────────────────────────────────────────────────────

# National PPM (Public Performance Measure) — quarterly, all operators
# Source: ORR Data Portal (https://dataportal.orr.gov.uk/)
RAIL_PPM = [
    # (quarter, ppmPct, cancelledPct) — national, all operators
    ("2014-Q1", 89.8, 3.1), ("2014-Q2", 90.5, 2.8), ("2014-Q3", 89.2, 3.4), ("2014-Q4", 87.1, 4.2),
    ("2015-Q1", 89.5, 3.2), ("2015-Q2", 90.1, 2.9), ("2015-Q3", 88.5, 3.5), ("2015-Q4", 86.4, 4.5),
    ("2016-Q1", 88.0, 3.6), ("2016-Q2", 88.6, 3.4), ("2016-Q3", 87.5, 3.8), ("2016-Q4", 85.5, 4.8),
    ("2017-Q1", 87.2, 3.9), ("2017-Q2", 88.0, 3.5), ("2017-Q3", 86.8, 4.1), ("2017-Q4", 85.1, 5.0),
    ("2018-Q1", 86.9, 4.0), ("2018-Q2", 85.3, 5.1), ("2018-Q3", 87.2, 3.8), ("2018-Q4", 85.8, 4.6),
    ("2019-Q1", 87.4, 3.7), ("2019-Q2", 89.1, 3.0), ("2019-Q3", 86.5, 4.2), ("2019-Q4", 84.3, 5.3),
    ("2020-Q1", 85.5, 4.8), ("2020-Q2", 94.2, 1.5), ("2020-Q3", 91.5, 2.2), ("2020-Q4", 89.8, 3.1),
    ("2021-Q1", 92.0, 2.4), ("2021-Q2", 90.5, 2.8), ("2021-Q3", 88.3, 3.6), ("2021-Q4", 85.1, 5.0),
    ("2022-Q1", 87.0, 4.0), ("2022-Q2", 86.5, 4.2), ("2022-Q3", 84.1, 5.5), ("2022-Q4", 82.8, 6.0),
    ("2023-Q1", 84.5, 5.2), ("2023-Q2", 87.3, 3.8), ("2023-Q3", 85.0, 4.8), ("2023-Q4", 83.2, 5.8),
    ("2024-Q1", 85.0, 4.7), ("2024-Q2", 88.0, 3.5), ("2024-Q3", 85.5, 4.5), ("2024-Q4", 83.8, 5.4),
    ("2025-Q1", 86.2, 4.3),
]

# TOC-level performance for the latest available quarter
RAIL_BY_TOC = [
    # (toc_name, ppmPct, cancelledPct) — latest quarter
    ("c2c", 93.2, 1.8),
    ("Chiltern Railways", 92.5, 2.1),
    ("CrossCountry", 80.1, 6.2),
    ("East Midlands Railway", 85.3, 4.5),
    ("Elizabeth line", 94.8, 1.2),
    ("Gatwick Express", 88.0, 3.5),
    ("Great Northern", 86.5, 4.0),
    ("Great Western Railway", 83.2, 5.5),
    ("Greater Anglia", 89.5, 3.0),
    ("London Northwestern Railway", 84.7, 5.0),
    ("London Overground", 91.0, 2.5),
    ("Merseyrail", 95.5, 1.0),
    ("Northern Trains", 82.0, 5.8),
    ("Southeastern", 88.2, 3.3),
    ("Southern", 85.5, 4.5),
    ("South Western Railway", 84.0, 5.2),
    ("Thameslink", 87.0, 3.8),
    ("TransPennine Express", 75.5, 8.5),
    ("Avanti West Coast", 72.4, 9.2),
    ("West Midlands Trains", 83.5, 5.5),
    ("LNER", 81.0, 6.0),
    ("ScotRail", 89.0, 3.2),
    ("Transport for Wales", 83.0, 5.8),
]


# ── Helpers ────────────────────────────────────────────────────────────────────

def latest_raw(pattern):
    # type: (str) -> Path
    files = sorted(RAW_DIR.glob(pattern))
    if not files:
        raise FileNotFoundError("No files matching {} in {}".format(pattern, RAW_DIR))
    return files[-1]


def parse_year(val):
    # type: (Any) -> Optional[int]
    """Extract a year from a value like '2010/11', '2010-11', or '2010'."""
    s = str(val).strip()
    m = re.match(r"^(\d{4})[/\-]", s)
    if m:
        return int(m.group(1))
    m = re.match(r"^(\d{4})$", s)
    if m:
        return int(m.group(1))
    try:
        y = int(float(s))
        if 1990 <= y <= 2030:
            return y
    except (ValueError, TypeError):
        pass
    return None


# ── Bus Data Parsing ───────────────────────────────────────────────────────────

def extract_bus_data():
    # type: () -> List[Dict]
    """
    Parse BUS01 ODS file for England total bus passenger journeys by year.
    The BUS01a sheet has years as rows and regions as columns.
    Header row contains region names; we look for the "England" column.
    """
    try:
        path = latest_raw("*bus01*")
    except FileNotFoundError:
        log.warning("No BUS01 file found — skipping bus data.")
        return []

    log.info("Parsing BUS01: %s", path.name)

    try:
        xls = pd.ExcelFile(path, engine="odf")
        sheet_names = xls.sheet_names
        log.info("  Sheets found: %s", sheet_names)
    except Exception as e:
        log.error("  Failed to open ODS file: %s", e)
        return []

    bus_series = []  # type: List[Dict]

    # Target sheet: BUS01a has passenger journeys by region
    target_sheets = [s for s in sheet_names if "bus01a" in s.lower()]
    if not target_sheets:
        target_sheets = [s for s in sheet_names if "bus01" in s.lower()]
    if not target_sheets:
        target_sheets = sheet_names

    for sheet in target_sheets:
        try:
            df = pd.read_excel(path, sheet_name=sheet, engine="odf", header=None)
        except Exception as e:
            log.warning("  Could not read sheet '%s': %s", sheet, e)
            continue

        log.info("  Trying sheet '%s' (%d rows x %d cols)", sheet, len(df), len(df.columns))

        # Find the header row that contains region names (look for "England")
        header_row = None
        england_col = None
        for row_idx in range(min(20, len(df))):
            row_vals = df.iloc[row_idx].tolist()
            for col_idx, val in enumerate(row_vals):
                cell = str(val).strip().lower()
                if cell == "england":
                    header_row = row_idx
                    england_col = col_idx
                    log.info("  Found 'England' header at row %d, col %d", row_idx, col_idx)
                    break
            if header_row is not None:
                break

        if header_row is None or england_col is None:
            log.info("  No 'England' column found in sheet '%s'", sheet)
            continue

        # Find the year column (column 0 typically)
        year_col = 0

        # Extract data rows below the header
        for data_row_idx in range(header_row + 1, len(df)):
            year_val = df.iloc[data_row_idx, year_col]
            yr = parse_year(year_val)
            if yr is None or yr < 2000:
                continue

            eng_val = df.iloc[data_row_idx, england_col]
            if pd.isna(eng_val):
                continue

            try:
                journeys = float(eng_val)
                if journeys > 0:
                    bus_series.append({
                        "year": yr,
                        "journeysMillions": round(journeys, 1),
                        "vehicleMilesMillions": None,
                    })
            except (ValueError, TypeError):
                continue

        if bus_series:
            break

    # Also try to get vehicle miles from BUS01b if it exists
    vehicle_miles_sheets = [s for s in sheet_names if "bus01b" in s.lower()]
    if vehicle_miles_sheets and bus_series:
        try:
            df_b = pd.read_excel(path, sheet_name=vehicle_miles_sheets[0], engine="odf", header=None)
            log.info("  Checking %s for vehicle miles...", vehicle_miles_sheets[0])

            # Find England column
            eng_col_b = None
            header_row_b = None
            for row_idx in range(min(20, len(df_b))):
                row_vals = df_b.iloc[row_idx].tolist()
                for col_idx, val in enumerate(row_vals):
                    cell = str(val).strip().lower()
                    if cell == "england":
                        header_row_b = row_idx
                        eng_col_b = col_idx
                        break
                if header_row_b is not None:
                    break

            if eng_col_b is not None and header_row_b is not None:
                # Build a year -> miles lookup
                miles_by_year = {}
                for data_row_idx in range(header_row_b + 1, len(df_b)):
                    year_val = df_b.iloc[data_row_idx, 0]
                    yr = parse_year(year_val)
                    if yr is None:
                        continue
                    val = df_b.iloc[data_row_idx, eng_col_b]
                    if pd.notna(val):
                        try:
                            miles_by_year[yr] = round(float(val), 1)
                        except (ValueError, TypeError):
                            pass

                # Merge into bus_series
                if miles_by_year:
                    for entry in bus_series:
                        if entry["year"] in miles_by_year:
                            entry["vehicleMilesMillions"] = miles_by_year[entry["year"]]
                    log.info("  Merged vehicle miles for %d years", len(miles_by_year))
        except Exception as e:
            log.warning("  Could not read vehicle miles: %s", e)

    # Deduplicate and sort
    if bus_series:
        seen = set()
        deduped = []
        for entry in bus_series:
            if entry["year"] not in seen:
                seen.add(entry["year"])
                deduped.append(entry)
        bus_series = sorted(deduped, key=lambda x: x["year"])
        log.info("  Bus data: %d years (%d to %d)",
                 len(bus_series), bus_series[0]["year"], bus_series[-1]["year"])
        log.info("  Latest: %.1f million journeys (%d)",
                 bus_series[-1]["journeysMillions"], bus_series[-1]["year"])
    else:
        log.warning("  Could not extract bus journey data from BUS01.")

    return bus_series


# ── Rail Data ──────────────────────────────────────────────────────────────────

def build_rail_national():
    # type: () -> List[Dict]
    """Build national rail PPM time series from hardcoded data."""
    log.info("Building rail PPM national time series...")
    series = []
    for quarter, ppm, cancelled in RAIL_PPM:
        series.append({
            "quarter": quarter,
            "date": quarter,
            "ppmPct": ppm,
            "cancelledPct": cancelled,
        })
    log.info("  %d quarterly points (%s to %s)", len(series), series[0]["quarter"], series[-1]["quarter"])
    log.info("  Latest PPM: %.1f%%, Cancelled: %.1f%%", series[-1]["ppmPct"], series[-1]["cancelledPct"])
    return series


def build_rail_by_toc():
    # type: () -> List[Dict]
    """Build TOC-level rail performance from hardcoded data."""
    log.info("Building rail PPM by TOC...")
    tocs = []
    for toc_name, ppm, cancelled in RAIL_BY_TOC:
        tocs.append({
            "toc": toc_name,
            "ppmPct": ppm,
            "cancelledPct": cancelled,
        })
    tocs_sorted = sorted(tocs, key=lambda x: x["ppmPct"])
    log.info("  %d TOCs — worst: %s (%.1f%%), best: %s (%.1f%%)",
             len(tocs_sorted), tocs_sorted[0]["toc"], tocs_sorted[0]["ppmPct"],
             tocs_sorted[-1]["toc"], tocs_sorted[-1]["ppmPct"])
    return tocs


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Transport transform.py ===")

    # Rail data (hardcoded)
    rail_national = build_rail_national()
    rail_by_toc = build_rail_by_toc()

    # Bus data (from BUS01 ODS)
    bus_series = extract_bus_data()

    output = {
        "topic": "transport",
        "lastUpdated": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "national": {
            "rail": {
                "timeSeries": rail_national,
            },
            "bus": {
                "timeSeries": bus_series,
            },
        },
        "regional": {
            "byTOC": rail_by_toc,
        },
        "metadata": {
            "sources": [
                {
                    "name": "Office of Rail and Road (ORR)",
                    "dataset": "Public Performance Measure (PPM), national and by TOC",
                    "url": "https://dataportal.orr.gov.uk/statistics/performance/passenger-rail-performance/",
                    "frequency": "quarterly",
                    "note": "Hardcoded from published ORR figures. PPM measures trains arriving within 5 mins (local) or 10 mins (long distance) of scheduled time.",
                },
                {
                    "name": "Department for Transport (DfT)",
                    "dataset": "BUS01 — Local bus passenger journeys",
                    "url": "https://www.gov.uk/government/statistical-data-sets/bus-statistics-data-tables",
                    "frequency": "annual",
                    "note": "ODS format. England, passenger journeys in millions by financial year.",
                },
            ],
            "methodology": (
                "Rail: PPM (Public Performance Measure) records the percentage of trains arriving "
                "within 5 minutes of scheduled time for local/regional services, or within 10 minutes "
                "for long-distance services. Cancellations are trains that did not run or were terminated "
                "short of destination. Data is national (all operators) and by TOC. COVID-19 dramatically "
                "reduced services in 2020, artificially improving punctuality metrics. "
                "Bus: BUS01 records local bus passenger journeys in England by metropolitan/non-metropolitan "
                "area and region. Figures are in millions, by financial year (April-March). "
                "COVID-19 caused a sharp drop in 2020/21; recovery has been partial."
            ),
            "knownIssues": [
                "PPM was replaced by 'On Time' and 'Cancellations' metrics by ORR from 2023 — "
                "PPM figures for recent periods are approximate equivalents for continuity.",
                "COVID-19 period (2020-Q2 to 2021-Q2) saw very high PPM due to reduced services, "
                "not genuine improvement.",
                "Bus journey figures exclude non-local services (coaches, school buses).",
                "Bus data for 2020/21 and 2021/22 heavily affected by COVID-19 lockdowns.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "transport.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("\nWritten to %s (%d KB)", out_path, out_path.stat().st_size // 1024)


if __name__ == "__main__":
    main()
