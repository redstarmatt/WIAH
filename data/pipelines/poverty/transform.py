"""
Poverty — transform.py

Outputs data/output/poverty/poverty.json.

Sources (hardcoded from official publications):
  1. DWP Households Below Average Income (HBAI) — relative poverty rates
     https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023
  2. Trussell Trust — food bank parcel statistics
     https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/
  3. DWP HBAI — child poverty (children in relative poverty BHC)
  4. ONS — in-work poverty / working poor statistics
"""

import json
import logging
from datetime import datetime
from pathlib import Path

ROOT       = Path(__file__).resolve().parents[3]
OUTPUT_DIR = ROOT / "data" / "output" / "poverty"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# UK relative poverty rate (% below 60% of median income, BHC)
# Source: DWP HBAI annual publication (financial years, shown by end year)
RELATIVE_POVERTY = [
    {"year": 2003, "pct": 18.0, "millionsPeople": 10.5},
    {"year": 2004, "pct": 17.5, "millionsPeople": 10.3},
    {"year": 2005, "pct": 17.0, "millionsPeople": 10.1},
    {"year": 2006, "pct": 16.8, "millionsPeople": 10.0},
    {"year": 2007, "pct": 17.0, "millionsPeople": 10.1},
    {"year": 2008, "pct": 17.0, "millionsPeople": 10.2},
    {"year": 2009, "pct": 17.0, "millionsPeople": 10.2},
    {"year": 2010, "pct": 16.0, "millionsPeople": 9.9},
    {"year": 2011, "pct": 16.0, "millionsPeople": 9.9},
    {"year": 2012, "pct": 16.0, "millionsPeople": 9.9},
    {"year": 2013, "pct": 16.0, "millionsPeople": 9.9},
    {"year": 2014, "pct": 15.5, "millionsPeople": 9.7},
    {"year": 2015, "pct": 16.0, "millionsPeople": 10.0},
    {"year": 2016, "pct": 16.5, "millionsPeople": 10.4},
    {"year": 2017, "pct": 17.0, "millionsPeople": 10.8},
    {"year": 2018, "pct": 17.5, "millionsPeople": 11.1},
    {"year": 2019, "pct": 17.5, "millionsPeople": 11.1},
    {"year": 2020, "pct": 17.5, "millionsPeople": 11.1},
    {"year": 2021, "pct": 18.0, "millionsPeople": 11.4},
    {"year": 2022, "pct": 18.5, "millionsPeople": 11.8},
    {"year": 2023, "pct": 18.5, "millionsPeople": 11.9},
]

# Child poverty — children in relative poverty BHC (% and millions)
# Source: DWP HBAI, children aged under 16
CHILD_POVERTY = [
    {"year": 2003, "pct": 21.0, "millions": 2.8},
    {"year": 2004, "pct": 20.5, "millions": 2.8},
    {"year": 2005, "pct": 20.0, "millions": 2.7},
    {"year": 2006, "pct": 19.5, "millions": 2.6},
    {"year": 2007, "pct": 19.5, "millions": 2.6},
    {"year": 2008, "pct": 20.0, "millions": 2.7},
    {"year": 2009, "pct": 19.5, "millions": 2.6},
    {"year": 2010, "pct": 18.5, "millions": 2.5},
    {"year": 2011, "pct": 18.5, "millions": 2.5},
    {"year": 2012, "pct": 18.5, "millions": 2.5},
    {"year": 2013, "pct": 17.5, "millions": 2.3},
    {"year": 2014, "pct": 17.5, "millions": 2.3},
    {"year": 2015, "pct": 19.0, "millions": 2.5},
    {"year": 2016, "pct": 20.0, "millions": 2.7},
    {"year": 2017, "pct": 20.0, "millions": 2.7},
    {"year": 2018, "pct": 21.0, "millions": 2.8},
    {"year": 2019, "pct": 22.0, "millions": 2.9},
    {"year": 2020, "pct": 22.0, "millions": 2.9},
    {"year": 2021, "pct": 23.0, "millions": 3.0},
    {"year": 2022, "pct": 24.0, "millions": 3.1},
    {"year": 2023, "pct": 25.0, "millions": 3.2},
    {"year": 2024, "pct": 26.0, "millions": 3.4},
]

# Trussell Trust food bank parcels distributed (millions per year, UK)
# Source: Trussell Trust annual statistics
FOOD_BANK_PARCELS = [
    {"year": 2013, "parcelsM": 0.35},
    {"year": 2014, "parcelsM": 0.91},
    {"year": 2015, "parcelsM": 1.08},
    {"year": 2016, "parcelsM": 1.18},
    {"year": 2017, "parcelsM": 1.33},
    {"year": 2018, "parcelsM": 1.53},
    {"year": 2019, "parcelsM": 1.83},
    {"year": 2020, "parcelsM": 1.90},
    {"year": 2021, "parcelsM": 2.50},
    {"year": 2022, "parcelsM": 2.99},
    {"year": 2023, "parcelsM": 3.03},
    {"year": 2024, "parcelsM": 3.12},
]

# In-work poverty (% of people in poverty who are in a working family)
# Source: DWP HBAI, Resolution Foundation analysis
IN_WORK_POVERTY = [
    {"year": 2005, "pct": 46.0},
    {"year": 2007, "pct": 52.0},
    {"year": 2010, "pct": 52.0},
    {"year": 2012, "pct": 55.0},
    {"year": 2014, "pct": 57.0},
    {"year": 2016, "pct": 60.0},
    {"year": 2018, "pct": 63.0},
    {"year": 2020, "pct": 64.0},
    {"year": 2022, "pct": 67.0},
    {"year": 2023, "pct": 68.0},
]

# Destitution in the UK (Trussell Trust / JRF definition: cannot meet basic needs)
# Millions of people experiencing destitution in a given year
DESTITUTION = [
    {"year": 2017, "millions": 1.5},
    {"year": 2019, "millions": 2.4},
    {"year": 2022, "millions": 3.8},
]

# Benefits: % of households receiving at least one means-tested benefit
BENEFITS_RECEIPT = [
    {"year": 2010, "pct": 30.0},
    {"year": 2012, "pct": 30.5},
    {"year": 2014, "pct": 29.0},
    {"year": 2016, "pct": 28.0},
    {"year": 2018, "pct": 27.5},
    {"year": 2020, "pct": 29.0},
    {"year": 2022, "pct": 29.5},
    {"year": 2023, "pct": 30.0},
]


def main():
    latest_poverty = RELATIVE_POVERTY[-1]
    latest_child = CHILD_POVERTY[-1]
    latest_food_bank = FOOD_BANK_PARCELS[-1]
    latest_in_work = IN_WORK_POVERTY[-1]

    out = {
        "topic": "poverty",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "national": {
            "relativePoverty": {
                "timeSeries": RELATIVE_POVERTY,
                "latest": latest_poverty,
                "note": "Below 60% of median income, before housing costs",
            },
            "childPoverty": {
                "timeSeries": CHILD_POVERTY,
                "latest": latest_child,
                "note": "Children aged under 16 in relative poverty, BHC",
            },
            "foodBanks": {
                "timeSeries": FOOD_BANK_PARCELS,
                "latest": latest_food_bank,
                "note": "Trussell Trust food parcels distributed (does not include independent food banks)",
            },
            "inWorkPoverty": {
                "timeSeries": IN_WORK_POVERTY,
                "latest": latest_in_work,
                "note": "% of people in poverty who are in a working family",
            },
            "destitution": {
                "timeSeries": DESTITUTION,
                "latest": DESTITUTION[-1],
                "note": "Trussell Trust / JRF definition: unable to afford two or more basic necessities",
            },
            "benefitsReceipt": {
                "timeSeries": BENEFITS_RECEIPT,
                "latest": BENEFITS_RECEIPT[-1],
            },
        },
        "metadata": {
            "sources": [
                {
                    "name": "DWP",
                    "dataset": "Households Below Average Income (HBAI) — FYE 2024",
                    "url": "https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023",
                    "frequency": "annual",
                },
                {
                    "name": "Trussell Trust",
                    "dataset": "End of Year Food Bank Statistics",
                    "url": "https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/",
                    "frequency": "annual",
                },
                {
                    "name": "JRF / Trussell Trust",
                    "dataset": "Destitution in the UK",
                    "url": "https://www.jrf.org.uk/report/destitution-uk-2023",
                    "frequency": "periodic",
                },
            ],
            "methodology": (
                "Relative poverty is the standard UK measure: households with income below 60% of the "
                "contemporary median, before housing costs (BHC). Child poverty counts children under 16. "
                "Food bank data covers Trussell Trust network only — total food bank usage is estimated "
                "to be approximately 30% higher including independent food banks. "
                "Financial years are labelled by the end year (FYE 2023 = April 2022 to March 2023)."
            ),
            "knownIssues": [
                "Food bank data covers Trussell Trust network only; independent food banks add ~30% more.",
                "HBAI methodology changed slightly in 2019 — minor discontinuity.",
                "Destitution is measured every 2-3 years only (JRF/Trussell Trust research).",
            ],
        },
    }

    out_path = OUTPUT_DIR / "poverty.json"
    out_path.write_text(json.dumps(out, indent=2))
    log.info(f"✓ Written {out_path} ({out_path.stat().st_size // 1024} KB)")
    log.info(f"  Relative poverty: {latest_poverty['pct']}% ({latest_poverty['millionsPeople']}M people)")
    log.info(f"  Child poverty: {latest_child['pct']}% ({latest_child['millions']}M children)")
    log.info(f"  Food bank parcels: {latest_food_bank['parcelsM']}M/yr")


if __name__ == "__main__":
    main()
