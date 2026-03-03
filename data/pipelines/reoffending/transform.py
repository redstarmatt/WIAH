"""
transform.py — Parse MOJ Proven Reoffending Statistics.

Input:  data/raw/reoffending/reoffending_overall.xlsx
Output: data/output/justice/reoffending.json

Data sheet columns: adult_child, cohort, region, category, subcat1, subcat2, offenders, reoffenders, reoffences
We want:
  1. Time series: overall reoffending rate (Adult + Child combined, England & Wales)
  2. By offence group: latest cohort breakdown (Adult + Child combined)
"""

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "reoffending"
OUTPUT_DIR = ROOT / "data" / "output" / "justice"


def cohort_to_date(cohort):
    """Convert 'Apr 2012 to Mar 2013' → '2012-04' (start of cohort period)."""
    parts = cohort.strip().split()
    months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
              "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}
    if len(parts) >= 2 and parts[0] in months:
        return f"{parts[1]}-{months[parts[0]]}"
    return None


def cohort_to_fy(cohort):
    """Convert 'Apr 2012 to Mar 2013' → '2012/13'."""
    parts = cohort.strip().split()
    if len(parts) >= 5:
        start_year = parts[1]
        end_year = parts[4]
        return f"{start_year}/{end_year[-2:]}"
    return cohort


def main():
    xlsx = RAW_DIR / "reoffending_overall.xlsx"
    if not xlsx.exists():
        log.error(f"File not found: {xlsx}")
        raise SystemExit(1)

    df = pd.read_excel(xlsx, sheet_name="Data", header=0)
    log.info(f"Read {len(df):,} rows from 'Data' sheet")

    # ── 1. Overall time series ────────────────────────────────────────────
    # Category = 'Total', Region = 'England and Wales'
    # Combine Adult + Child for each cohort
    total = df[(df["category"] == "Total") & (df["region"] == "England and Wales")].copy()
    total["offenders"] = pd.to_numeric(total["offenders"], errors="coerce")
    total["reoffenders"] = pd.to_numeric(total["reoffenders"], errors="coerce")
    total["reoffences"] = pd.to_numeric(total["reoffences"], errors="coerce")

    # Sum Adult + Child per cohort
    grouped = total.groupby("cohort").agg(
        offenders=("offenders", "sum"),
        reoffenders=("reoffenders", "sum"),
        reoffences=("reoffences", "sum"),
    ).reset_index()

    time_series = []
    for _, row in grouped.iterrows():
        cohort = row["cohort"]
        off = row["offenders"]
        reoff = row["reoffenders"]
        reof = row["reoffences"]

        if pd.isna(off) or off == 0:
            continue

        rate = round(reoff / off * 100, 1)
        avg = round(reof / reoff, 2) if reoff > 0 else None
        date = cohort_to_date(cohort)

        time_series.append({
            "cohort": cohort_to_fy(cohort),
            "date": date,
            "offenders": int(off),
            "reoffenders": int(reoff),
            "reoffences": int(reof),
            "reoffendingRate": rate,
            "avgReoffences": avg,
        })

    # Sort by date
    time_series.sort(key=lambda x: x["date"] or "")
    log.info(f"Time series: {len(time_series)} annual cohorts")
    if time_series:
        latest = time_series[-1]
        log.info(f"  Latest: {latest['cohort']} — rate {latest['reoffendingRate']}%, "
                 f"avg {latest['avgReoffences']} reoffences/reoffender")

    # ── 2. By offence group (latest cohort) ───────────────────────────────
    latest_cohort = sorted(df["cohort"].unique())[-1]
    offence = df[
        (df["category"] == "Index offence total") &
        (df["region"] == "England and Wales") &
        (df["cohort"] == latest_cohort)
    ].copy()
    offence["offenders"] = pd.to_numeric(offence["offenders"], errors="coerce")
    offence["reoffenders"] = pd.to_numeric(offence["reoffenders"], errors="coerce")
    offence["reoffences"] = pd.to_numeric(offence["reoffences"], errors="coerce")

    # Sum Adult + Child for each offence group
    by_group = offence.groupby("subcat1").agg(
        offenders=("offenders", "sum"),
        reoffenders=("reoffenders", "sum"),
        reoffences=("reoffences", "sum"),
    ).reset_index()

    offence_groups = []
    for _, row in by_group.iterrows():
        group = row["subcat1"]
        off = row["offenders"]
        reoff = row["reoffenders"]

        if pd.isna(off) or off == 0:
            continue

        rate = round(reoff / off * 100, 1)
        offence_groups.append({
            "group": group,
            "offenders": int(off),
            "reoffenders": int(reoff),
            "reoffendingRate": rate,
        })

    # Sort by rate descending (worst first)
    offence_groups.sort(key=lambda x: x["reoffendingRate"], reverse=True)
    log.info(f"Offence groups: {len(offence_groups)} groups (latest cohort: {latest_cohort})")
    if offence_groups:
        log.info(f"  Worst: {offence_groups[0]['group']} ({offence_groups[0]['reoffendingRate']}%)")
        log.info(f"  Best: {offence_groups[-1]['group']} ({offence_groups[-1]['reoffendingRate']}%)")

    # ── Output ────────────────────────────────────────────────────────────
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = {
        "timeSeries": time_series,
        "byOffenceGroup": offence_groups,
        "latestCohort": cohort_to_fy(latest_cohort),
        "metadata": {
            "sources": [{
                "name": "Ministry of Justice",
                "dataset": "Proven Reoffending Statistics",
                "url": "https://www.gov.uk/government/collections/proven-reoffending-statistics",
                "frequency": "quarterly (annual cohorts)",
                "retrieved": datetime.now().isoformat(),
            }],
            "methodology": "A proven reoffence is any offence committed in a one-year follow-up period that results in a court conviction, caution, reprimand or warning within a further six-month waiting period. Rate = reoffenders / offenders × 100.",
            "knownIssues": [
                "COVID-19 caused a significant drop in offenders entering the cohort in 2020/21",
                "From October 2015, data based on individual-level Police National Computer data rather than aggregate counts",
            ],
        },
    }

    out_path = OUTPUT_DIR / "reoffending.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"Wrote {out_path} ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
