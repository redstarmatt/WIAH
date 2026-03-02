"""
Water data pipeline — transform.py

Outputs water.json with:
  - Sewage discharge trends (2016–2024, national + per company)
  - River health (WFD surface water classification)
  - Bathing water quality (hardcoded from EA published data)
"""

import json
import logging
from pathlib import Path

import pandas as pd

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "water"
OUT = Path(__file__).resolve().parent.parent.parent / "output" / "water"
OUT.mkdir(parents=True, exist_ok=True)


def latest_raw(pattern):
    matches = sorted(RAW.glob(pattern))
    return matches[-1] if matches else None


# ── 1. EDM sewage discharge ──────────────────────────────────────────────────

def extract_edm():
    """Extract national sewage discharge trends and per-company 2024 data."""
    path = latest_raw("*edm_trends*")
    if not path:
        return None, None

    # Long-term trends sheet
    df = pd.read_excel(path, sheet_name="Long-term trends", header=None)
    years_row = df.iloc[3].values[2:]  # 2016, 2017, ...
    spills_row = df.iloc[7].values[2:]  # total spill events
    hours_row = df.iloc[8].values[2:]   # total duration hours
    monitors_row = df.iloc[6].values[2:]  # overflows with spill data
    avg_spills_row = df.iloc[9].values[2:]  # avg spills per overflow

    national_ts = []
    for i, yr in enumerate(years_row):
        try:
            year = int(float(str(yr).replace("*", "").strip()))
        except (ValueError, TypeError):
            continue
        try:
            hours = float(hours_row[i])
            spills = float(spills_row[i])
            monitors = float(monitors_row[i])
            avg = float(avg_spills_row[i])
            national_ts.append({
                "year": year,
                "totalHours": round(hours),
                "totalSpills": round(spills),
                "monitorsReporting": round(monitors),
                "avgSpillsPerOverflow": round(avg, 1),
            })
        except (ValueError, TypeError):
            pass

    log.info(f"EDM national: {len(national_ts)} annual points")
    if national_ts:
        latest = national_ts[-1]
        log.info(f"  {latest['year']}: {latest['totalHours']:,} hours, {latest['totalSpills']:,} spills")

    # Per-company 2024 data
    df24 = pd.read_excel(path, sheet_name="2024 Summary Data", header=None)
    companies_row = df24.iloc[8].values[2:]
    spills_company = df24.iloc[19].values[2:]  # total spill events row
    hours_company = df24.iloc[21].values[2:]   # total duration hours
    avg_spills_company = df24.iloc[14].values[2:]

    by_company = []
    for i, name in enumerate(companies_row):
        name_str = str(name).strip()
        if not name_str or name_str == "nan":
            continue
        # Clean up company name
        short = name_str.split("(")[0].strip()
        try:
            by_company.append({
                "name": short,
                "totalSpills": round(float(spills_company[i])),
                "totalHours": round(float(hours_company[i])),
                "avgSpillsPerOverflow": round(float(avg_spills_company[i]), 1),
            })
        except (ValueError, TypeError):
            pass

    log.info(f"EDM by company: {len(by_company)} companies")

    return national_ts, by_company


# ── 2. River health ──────────────────────────────────────────────────────────

def extract_river_health():
    """Extract river health from Defra B3a CSV + hardcoded historical."""
    # B3a only has one snapshot (2019 = 16%)
    # Historical data from EA/Defra publications
    historical = [
        {"year": 2009, "goodOrBetterPct": 26},
        {"year": 2012, "goodOrBetterPct": 22},
        {"year": 2015, "goodOrBetterPct": 17},
        {"year": 2016, "goodOrBetterPct": 17},
        {"year": 2019, "goodOrBetterPct": 16},
    ]

    path = latest_raw("*river_health*")
    if path:
        df = pd.read_csv(path)
        good_row = df[
            (df["water_body"] == "All surface water bodies") &
            (df["status"].str.contains("at good status"))
        ]
        if len(good_row) > 0:
            pct = float(good_row.iloc[0]["percentage"])
            log.info(f"River health from B3a: {pct}% at good status")
    else:
        log.info("River health: using hardcoded historical data")

    log.info(f"River health: {len(historical)} points")
    return historical


# ── 3. Bathing water quality ─────────────────────────────────────────────────

def build_bathing_water():
    """Hardcoded from EA published bathing water statistics."""
    # Source: GOV.UK bathing water quality statistics, ENV17
    # No 2020 data (COVID — no classifications made)
    data = [
        {"year": 2015, "excellentPct": 65.4, "goodPct": 25.4, "sufficientPct": 5.3, "poorPct": 3.8, "totalSites": 413},
        {"year": 2016, "excellentPct": 65.3, "goodPct": 24.5, "sufficientPct": 6.5, "poorPct": 3.6, "totalSites": 414},
        {"year": 2017, "excellentPct": 65.1, "goodPct": 25.8, "sufficientPct": 6.3, "poorPct": 2.9, "totalSites": 413},
        {"year": 2018, "excellentPct": 65.1, "goodPct": 25.8, "sufficientPct": 5.3, "poorPct": 3.9, "totalSites": 418},
        {"year": 2019, "excellentPct": 71.1, "goodPct": 19.6, "sufficientPct": 6.3, "poorPct": 3.0, "totalSites": 420},
        {"year": 2021, "excellentPct": 69.8, "goodPct": 20.0, "sufficientPct": 5.9, "poorPct": 4.3, "totalSites": 442},
        {"year": 2022, "excellentPct": 72.3, "goodPct": 19.0, "sufficientPct": 5.2, "poorPct": 3.6, "totalSites": 451},
        {"year": 2023, "excellentPct": 68.6, "goodPct": 21.5, "sufficientPct": 4.4, "poorPct": 5.5, "totalSites": 451},
        {"year": 2024, "excellentPct": 63.5, "goodPct": 24.7, "sufficientPct": 4.9, "poorPct": 6.9, "totalSites": 451},
        {"year": 2025, "excellentPct": 66.1, "goodPct": 22.0, "sufficientPct": 4.7, "poorPct": 7.1, "totalSites": 449},
    ]
    log.info(f"Bathing water: {len(data)} annual points (2015–2025, excl 2020)")
    return data


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Water transform.py ===")

    edm_national, edm_companies = extract_edm()
    river_health = extract_river_health()
    bathing = build_bathing_water()

    output = {
        "topic": "water",
        "lastUpdated": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "national": {
            "sewage": {
                "timeSeries": edm_national or [],
                "byCompany2024": edm_companies or [],
            },
            "riverHealth": {
                "timeSeries": river_health or [],
            },
            "bathingWater": {
                "timeSeries": bathing,
            },
        },
        "metadata": {
            "sources": [
                {
                    "name": "Environment Agency",
                    "dataset": "Event Duration Monitoring — Storm Overflow Annual Returns, 2024",
                    "url": "https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns",
                    "frequency": "annual",
                },
                {
                    "name": "Environment Agency / Defra",
                    "dataset": "Water Framework Directive classification, B3 indicator",
                    "url": "https://oifdata.defra.gov.uk/themes/water/B3/",
                    "frequency": "periodic (last full classification 2019)",
                },
                {
                    "name": "Environment Agency",
                    "dataset": "Bathing water quality statistics (ENV17)",
                    "url": "https://www.gov.uk/government/statistics/bathing-water-quality-statistics",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Sewage discharge data from Environment Agency EDM annual returns. "
                "Total hours and spill events are monitored totals — coverage expanded from "
                "~860 monitors in 2016 to 14,254 (100%) in 2024. Early years significantly "
                "under-count actual discharges. River health from WFD classification "
                "(last full assessment 2019). Bathing water classifications under revised "
                "Bathing Water Directive (rBWD) from 2015. No 2020 data due to COVID."
            ),
            "knownIssues": [
                "EDM monitor coverage expanded dramatically: 862 in 2016 vs 14,254 in 2024. "
                "Year-on-year comparisons must account for this.",
                "River health data last fully updated in 2019 — no reclassification since.",
                "No bathing water classifications for 2020 (COVID).",
                "Some spill data includes partial-year monitoring (counted pro-rata).",
            ],
        },
    }

    dest = OUT / "water.json"
    dest.write_text(json.dumps(output, indent=2))
    size_kb = dest.stat().st_size / 1024
    log.info(f"\n✓ Written to {dest} ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
