"""
Social Care — transform.py

Processes CQC directory CSV (if available) + hardcoded data into
data/output/social-care/social_care.json.

Sources:
  1. CQC care directory CSV — current ratings for all regulated locations
  2. NHS England Discharge Delays SitRep — monthly delayed discharges (hardcoded)
  3. DHSC Annual Report — adult social care spending, real terms (hardcoded)
  4. Census 2021 + Carers UK — unpaid carers (hardcoded)
"""

import csv
import json
import logging
from datetime import datetime
from pathlib import Path

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "social-care"
OUTPUT_DIR = ROOT / "data" / "output" / "social-care"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ── CQC CSV parser ─────────────────────────────────────────────────────────────

def parse_cqc_csv(path):
    """Parse CQC directory CSV and compute ratings distribution for adult social care."""
    log.info("Parsing CQC directory: %s", path.name)
    counts = {"Outstanding": 0, "Good": 0, "Requires improvement": 0, "Inadequate": 0}
    total = 0
    skipped = 0

    with open(path, encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Filter to adult social care only
            directorate = row.get("location_inspection_directorate", "").strip()
            if "Social Care" not in directorate and "social care" not in directorate.lower():
                # Try alternative column names
                directorate = row.get("Inspection directorate", "").strip()
                if "Social Care" not in directorate and "social care" not in directorate.lower():
                    skipped += 1
                    continue

            rating = row.get("location_latest_overall_rating", "").strip()
            if not rating:
                rating = row.get("Latest overall rating", "").strip()

            if rating in counts:
                counts[rating] += 1
                total += 1

    log.info("  Total adult social care locations with rating: %d (skipped %d non-ASC)", total, skipped)
    if total == 0:
        log.warning("  No CQC data parsed — will use hardcoded ratings.")
        return None

    result = {
        "totalLocations": total,
        "outstandingPct": round(counts["Outstanding"] / total * 100, 1),
        "goodPct": round(counts["Good"] / total * 100, 1),
        "requiresImprovementPct": round(counts["Requires improvement"] / total * 100, 1),
        "inadequatePct": round(counts["Inadequate"] / total * 100, 1),
        "outstanding": counts["Outstanding"],
        "good": counts["Good"],
        "requiresImprovement": counts["Requires improvement"],
        "inadequate": counts["Inadequate"],
    }
    log.info("  Ratings: O=%.1f%%, G=%.1f%%, RI=%.1f%%, I=%.1f%%",
             result["outstandingPct"], result["goodPct"],
             result["requiresImprovementPct"], result["inadequatePct"])
    return result


def latest_raw(pattern):
    files = sorted(RAW_DIR.glob(pattern))
    if not files:
        return None
    return files[-1]


# ── Hardcoded data ─────────────────────────────────────────────────────────────

# NHS England Discharge Delays — average daily number of patients who did not
# meet criteria to reside (i.e. delayed) per month, England acute trusts.
# Source: NHS England Daily Discharge Situation Report (timeseries workbook)
# https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/
# Note: methodology changed May 2024 (expanded scope)
DISCHARGE_DELAYS = [
    # (date, avg_daily_delayed, total_lost_bed_days_thousands)
    ("2021-06", 9200, 276),
    ("2021-09", 10600, 318),
    ("2021-12", 12800, 397),
    ("2022-03", 12400, 384),
    ("2022-06", 13100, 393),
    ("2022-09", 13500, 405),
    ("2022-12", 14200, 440),
    ("2023-03", 13800, 428),
    ("2023-06", 13400, 402),
    ("2023-09", 13100, 393),
    ("2023-12", 14300, 443),
    ("2024-03", 13700, 425),
    ("2024-06", 12900, 387),   # Post methodology change (May 2024)
    ("2024-09", 12600, 378),
    ("2024-12", 13500, 419),
    ("2025-01", 13200, 409),
]

# Discharge delay reasons — latest snapshot breakdown (% of total delayed days)
# Source: NHS England SitRep, Jan 2025
DELAY_REASONS = [
    {"reason": "Awaiting care package (home)", "pct": 28.4},
    {"reason": "Awaiting nursing/residential home", "pct": 20.1},
    {"reason": "Awaiting further NHS care", "pct": 17.3},
    {"reason": "Awaiting assessment", "pct": 12.5},
    {"reason": "Awaiting community equipment/adaptations", "pct": 8.2},
    {"reason": "Patient or family choice", "pct": 7.8},
    {"reason": "Other / housing", "pct": 5.7},
]

# Adult social care spending — local authority, real terms (2023-24 prices, £bn)
# Source: DHSC Annual Report / NHS Digital Adult Social Care Activity and Finance
# https://digital.nhs.uk/data-and-information/publications/statistical/adult-social-care-activity-and-finance-report
SPENDING = [
    (2010, 21.2), (2011, 20.4), (2012, 19.6), (2013, 19.0),
    (2014, 18.5), (2015, 18.0), (2016, 17.8), (2017, 17.7),
    (2018, 17.9), (2019, 18.3), (2020, 19.5), (2021, 20.1),
    (2022, 20.8), (2023, 21.5), (2024, 22.0),
]

# Unpaid carers — Census 2021 + Carers UK estimates
# Source: ONS Census 2021 / Carers UK State of Caring 2024
UNPAID_CARERS = {
    "totalCarers": 4960000,
    "carers50PlusHrsWk": 1060000,
    "pctPopulation": 8.9,
    "censuYear": 2021,
    "economicValueBn": 162,  # Carers UK estimate of economic value £bn/yr
}

# CQC hardcoded fallback (from CQC State of Care 2024-25)
CQC_FALLBACK = {
    "totalLocations": 27500,
    "outstandingPct": 4.4,
    "goodPct": 79.8,
    "requiresImprovementPct": 13.2,
    "inadequatePct": 1.5,
    "outstanding": 1210,
    "good": 21945,
    "requiresImprovement": 3630,
    "inadequate": 413,
}


# ── Build output ─────────────────────────────────────────────────────────────

def main():
    log.info("=== Social Care transform.py ===")

    # Try CQC CSV
    cqc_path = latest_raw("*cqc_directory*")
    cqc_ratings = None
    if cqc_path:
        cqc_ratings = parse_cqc_csv(cqc_path)

    if cqc_ratings is None:
        log.info("Using hardcoded CQC ratings (fallback).")
        cqc_ratings = CQC_FALLBACK

    # Build discharge delays series
    log.info("Building discharge delays series…")
    delays_series = []
    for date, avg_daily, lost_days_k in DISCHARGE_DELAYS:
        delays_series.append({
            "date": date,
            "avgDailyDelayed": avg_daily,
            "lostBedDaysK": lost_days_k,
        })
    log.info("  -> %d quarterly points", len(delays_series))

    # Build spending series
    log.info("Building spending series…")
    spending_series = [{"year": y, "realTermsBn": v} for y, v in SPENDING]
    log.info("  -> %d annual points (%d-%d)", len(spending_series), SPENDING[0][0], SPENDING[-1][0])

    # Build delay reasons
    log.info("Building delay reasons breakdown…")
    reasons = DELAY_REASONS

    output = {
        "topic": "social-care",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "national": {
            "dischargeDelays": {
                "timeSeries": delays_series,
                "latestAvgDaily": delays_series[-1]["avgDailyDelayed"],
                "reasons": reasons,
            },
            "cqcRatings": cqc_ratings,
            "spending": spending_series,
            "unpaidCarers": UNPAID_CARERS,
        },
        "regional": {},
        "metadata": {
            "sources": [
                {
                    "name": "NHS England",
                    "dataset": "Daily Discharge Situation Report (timeseries)",
                    "url": "https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/",
                    "frequency": "monthly",
                },
                {
                    "name": "Care Quality Commission",
                    "dataset": "Care directory with latest ratings",
                    "url": "https://www.cqc.org.uk/about-us/transparency/using-cqc-data",
                    "frequency": "monthly",
                },
                {
                    "name": "NHS Digital",
                    "dataset": "Adult Social Care Activity and Finance Report",
                    "url": "https://digital.nhs.uk/data-and-information/publications/statistical/adult-social-care-activity-and-finance-report",
                    "frequency": "annual",
                },
                {
                    "name": "ONS / Carers UK",
                    "dataset": "Census 2021 — Unpaid care / State of Caring 2024",
                    "url": "https://www.ons.gov.uk/census/maps/choropleth/health/unpaid-care/unpaid-care-19a/provides-no-unpaid-care",
                    "frequency": "decennial (Census) / annual (Carers UK)",
                },
            ],
            "methodology": (
                "Discharge delay figures are from the NHS England Daily Discharge Situation Report. "
                "The data covers patients in acute trusts who do not meet the criteria to reside "
                "(i.e. are medically fit but cannot be discharged). The methodology was expanded in "
                "May 2024 to include all patients delayed by at least one day (previously 7+ days only). "
                "CQC ratings are the latest overall rating for each adult social care location in England. "
                "Spending figures are in 2023-24 prices (real terms), covering local authority adult social care "
                "net current expenditure. Unpaid carers data is from the 2021 Census."
            ),
            "knownIssues": [
                "Discharge delays methodology changed May 2024 — pre/post figures are not directly comparable.",
                "CQC ratings are a snapshot of the latest inspection — they do not show historical trends.",
                "Under the new CQC assessment framework, locations with multiple service types may show 'Not Rated'.",
                "Spending figures exclude NHS-funded social care and self-funded care.",
                "Unpaid carer numbers likely undercount — many carers do not identify as such.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "social_care.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info("Written to %s (%d KB)", out_path, out_path.stat().st_size // 1024)


if __name__ == "__main__":
    main()
