"""
Energy — transform.py

Processes ONS timeseries CSVs + hardcoded DESNZ / fuel-poverty data
into data/output/energy/energy.json.

Sources:
  1. D7DT — CPI Electricity price index (2015=100, monthly)
  2. D7DU — CPI Gas price index (2015=100, monthly)
  3. DESNZ Energy Trends Section 6 — renewable share & generation by source (hardcoded)
  4. DESNZ / BEIS — Fuel poverty (LILEE metric, hardcoded)
"""

import csv
import json
import logging
from datetime import datetime
from pathlib import Path

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "energy"
OUTPUT_DIR = ROOT / "data" / "output" / "energy"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MONTH_MAP = {
    "JAN": "01", "FEB": "02", "MAR": "03", "APR": "04",
    "MAY": "05", "JUN": "06", "JUL": "07", "AUG": "08",
    "SEP": "09", "OCT": "10", "NOV": "11", "DEC": "12",
}


def latest_raw(pattern):
    files = sorted(RAW_DIR.glob(pattern))
    if not files:
        raise FileNotFoundError("No files matching {p} in {d}".format(p=pattern, d=RAW_DIR))
    return files[-1]


# ── Generic ONS CSV parser ────────────────────────────────────────────────────

def parse_ons_csv(path):
    """Parse ONS timeseries CSV -> list of {date, value}."""
    rows = []
    in_data = False
    with open(path, encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        for row in reader:
            if not in_data:
                if row and row[0].strip() in ("2000 JAN", "1988 JAN", "Important"):
                    if row[0].strip().endswith("JAN"):
                        in_data = True
                    else:
                        continue
                # Also trigger on any row starting with a year
                elif row and len(row) >= 2:
                    try:
                        parts = row[0].strip().split()
                        if len(parts) == 2 and 1980 <= int(parts[0]) <= 2030:
                            in_data = True
                    except (ValueError, IndexError):
                        continue
                if not in_data:
                    continue
            if not row or not row[0].strip():
                continue
            parts = row[0].strip().split()
            if len(parts) != 2:
                continue
            try:
                year = int(parts[0])
            except ValueError:
                continue
            m = MONTH_MAP.get(parts[1].upper())
            if not m:
                continue
            try:
                val = float(row[1].strip())
            except (ValueError, IndexError):
                continue
            rows.append({"date": "{y}-{m}".format(y=year, m=m), "value": val})
    return rows


# ── Hardcoded data ─────────────────────────────────────────────────────────────

# DESNZ Energy Trends Section 6 — renewable share of electricity generation (annual %)
RENEWABLE_SHARE = [
    (2000, 2.8), (2001, 2.6), (2002, 2.9), (2003, 2.8), (2004, 3.6),
    (2005, 4.2), (2006, 4.5), (2007, 4.9), (2008, 5.5), (2009, 6.7),
    (2010, 7.4), (2011, 9.4), (2012, 11.3), (2013, 14.9), (2014, 19.1),
    (2015, 24.6), (2016, 24.5), (2017, 29.3), (2018, 33.0), (2019, 36.9),
    (2020, 43.1), (2021, 39.4), (2022, 41.4), (2023, 43.0), (2024, 45.2),
]

# Generation by source (TWh), from DESNZ Energy Trends
# (year, wind, solar, bioenergy, hydro)
GENERATION_BY_SOURCE = [
    (2010, 10.2, 0.0, 14.3, 3.6),
    (2011, 15.8, 0.3, 17.2, 5.7),
    (2012, 19.6, 1.4, 19.3, 5.3),
    (2013, 28.4, 2.0, 22.0, 4.7),
    (2014, 31.5, 4.0, 24.8, 5.9),
    (2015, 40.3, 7.6, 27.5, 6.3),
    (2016, 37.4, 10.4, 29.6, 5.4),
    (2017, 49.6, 11.5, 31.7, 5.9),
    (2018, 57.1, 12.9, 32.8, 5.4),
    (2019, 64.1, 12.8, 35.2, 5.9),
    (2020, 75.6, 13.2, 37.6, 5.5),
    (2021, 64.3, 12.7, 38.4, 4.6),
    (2022, 80.3, 14.4, 37.0, 4.4),
    (2023, 82.5, 15.2, 41.0, 4.8),
    (2024, 87.0, 19.0, 41.5, 4.5),
]

# Fuel poverty (LILEE metric, % of English households)
FUEL_POVERTY = [
    (2010, 16.4), (2011, 15.3), (2012, 14.0), (2013, 13.2), (2014, 12.2),
    (2015, 11.5), (2016, 11.1), (2017, 10.8), (2018, 10.3), (2019, 13.4),
    (2020, 13.2), (2021, 13.1), (2022, 13.0), (2023, 13.8),
]


# ── Extract functions ──────────────────────────────────────────────────────────

def extract_price_index(path, label):
    log.info("Extracting %s price index…", label)
    rows = parse_ons_csv(path)
    log.info("  -> %d monthly points", len(rows))
    if rows:
        log.info("  Range: %s to %s", rows[0]["date"], rows[-1]["date"])
        log.info("  Latest: %s", rows[-1]["value"])
    return [{"date": r["date"], "index": r["value"]} for r in rows]


def build_renewable_share():
    log.info("Building renewable share series…")
    series = [{"year": y, "pct": p} for y, p in RENEWABLE_SHARE]
    log.info("  -> %d annual points (%d-%d)", len(series), series[0]["year"], series[-1]["year"])
    log.info("  Latest: %.1f%%", series[-1]["pct"])
    return series


def build_generation_by_source():
    log.info("Building generation by source series…")
    series = []
    for year, wind, solar, bio, hydro in GENERATION_BY_SOURCE:
        total = round(wind + solar + bio + hydro, 1)
        series.append({
            "year": year,
            "windTWh": wind,
            "solarTWh": solar,
            "bioenergyTWh": bio,
            "hydroTWh": hydro,
            "totalTWh": total,
        })
    log.info("  -> %d annual points (%d-%d)", len(series), series[0]["year"], series[-1]["year"])
    log.info("  Latest total: %.1f TWh", series[-1]["totalTWh"])
    return series


def build_fuel_poverty():
    log.info("Building fuel poverty series…")
    series = [{"year": y, "pct": p} for y, p in FUEL_POVERTY]
    log.info("  -> %d annual points (%d-%d)", len(series), series[0]["year"], series[-1]["year"])
    log.info("  Latest: %.1f%%", series[-1]["pct"])
    return series


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Energy transform.py ===")

    elec_path = latest_raw("*cpi_electricity*")
    gas_path = latest_raw("*cpi_gas*")

    electricity = extract_price_index(elec_path, "electricity")
    gas = extract_price_index(gas_path, "gas")
    renewable_share = build_renewable_share()
    generation = build_generation_by_source()
    fuel_poverty = build_fuel_poverty()

    output = {
        "topic": "energy",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "national": {
            "renewables": {
                "sharePct": renewable_share,
                "bySource": generation,
            },
            "prices": {
                "electricity": electricity,
                "gas": gas,
            },
            "fuelPoverty": fuel_poverty,
        },
        "regional": {},
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "CPI Electricity price index (D7DT), MM23, 2015=100",
                    "url": "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7dt/mm23",
                    "frequency": "monthly",
                },
                {
                    "name": "ONS",
                    "dataset": "CPI Gas price index (D7DU), MM23, 2015=100",
                    "url": "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7du/mm23",
                    "frequency": "monthly",
                },
                {
                    "name": "DESNZ",
                    "dataset": "Energy Trends Section 6 — Renewables",
                    "url": "https://www.gov.uk/government/statistics/energy-trends-section-6-renewables",
                    "frequency": "quarterly / annual",
                },
                {
                    "name": "DESNZ / BEIS",
                    "dataset": "Fuel Poverty Statistics (LILEE metric)",
                    "url": "https://www.gov.uk/government/collections/fuel-poverty-statistics",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Electricity and gas price indices are from the ONS CPI sub-indices (2015=100). "
                "Renewable generation data is from DESNZ Energy Trends Section 6, covering UK "
                "electricity generation from wind, solar, bioenergy, and hydro sources. "
                "Fuel poverty uses the Low Income Low Energy Efficiency (LILEE) metric introduced "
                "in 2019, measuring the percentage of English households in fuel poverty."
            ),
            "knownIssues": [
                "Fuel poverty methodology changed in 2019 from '10% threshold' to LILEE — pre/post figures are not directly comparable.",
                "Renewable generation figures are for the UK; price indices are for the UK.",
                "CPI price indices use 2015=100 as the base period.",
                "2021 saw lower wind output due to unusually calm conditions, not a capacity decline.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "energy.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written to %s (%d KB)", out_path, out_path.stat().st_size // 1024)


if __name__ == "__main__":
    main()
