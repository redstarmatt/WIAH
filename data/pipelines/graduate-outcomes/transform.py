"""
transform.py — Parse DfE LEO Graduate Outcomes data.

Input:  data/raw/graduate-outcomes/outcomes_earnings.csv (44MB)
Output: data/output/education/graduate_outcomes.json

Extracts:
1. National median graduate earnings time series (1yr / 3yr / 5yr post-graduation)
2. Sustained employment rate time series
3. Earnings by subject group (latest year, 5yr post-graduation)
"""

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "graduate-outcomes"
OUTPUT_DIR = ROOT / "data" / "output" / "education"

TOTAL_FILTERS = {
    "geographic_level": "National",
    "qualification_level": "First-degree",
    "sex": "Total",
    "country_of_domicile_grouped": "UK",
    "study_mode": "Total",
    "ethnicity_major": "Total",
    "age_band": "Total",
    "POLAR4": "Total",
    "inst_type": "Total",
    "prior_attainment": "Total",
    "FSM": "Total",
    "region_name_origin": "Total",
    "residence": "Total",
    "region_name_current": "Total",
}


def safe_float(v):
    try:
        f = float(v)
        return round(f, 1) if not pd.isna(f) else None
    except (ValueError, TypeError):
        return None


def safe_int(v):
    try:
        return int(float(v)) if not pd.isna(v) else None
    except (ValueError, TypeError):
        return None


def tp_to_tax_year(tp):
    """Convert 202223 → '2022/23'."""
    s = str(tp)
    return f"{s[:4]}/{s[4:]}"


def main():
    csv_path = RAW_DIR / "outcomes_earnings.csv"
    if not csv_path.exists():
        log.error(f"File not found: {csv_path}")
        raise SystemExit(1)

    df = pd.read_csv(csv_path)
    log.info(f"Read {len(df):,} rows from outcomes CSV")

    # ── 1. National time series (earnings + employment) ─────────────────
    # Filter to national totals (all subjects combined)
    mask = pd.Series(True, index=df.index)
    for col, val in TOTAL_FILTERS.items():
        mask &= (df[col] == val)
    mask &= (df["subject_name"] == "Total")

    national = df[mask].copy()
    log.info(f"National totals: {len(national)} rows")

    # Build time series grouped by time_period
    earnings_ts = []
    employment_ts = []
    time_periods = sorted(national["time_period"].unique())

    for tp in time_periods:
        tp_data = national[national["time_period"] == tp]
        tax_year = tp_to_tax_year(tp)

        earn_point = {"taxYear": tax_year}
        emp_point = {"taxYear": tax_year}

        for _, row in tp_data.iterrows():
            yag = row["YAG"]
            med = safe_float(row["earnings_median"])
            emp = safe_float(row["sust_emp_with_or_without_fs"])

            if yag == "1 YAG":
                earn_point["median1yr"] = safe_int(row["earnings_median"])
                emp_point["employment1yr"] = emp
            elif yag == "3 YAG":
                earn_point["median3yr"] = safe_int(row["earnings_median"])
                emp_point["employment3yr"] = emp
            elif yag == "5 YAG":
                earn_point["median5yr"] = safe_int(row["earnings_median"])
                emp_point["employment5yr"] = emp
            elif yag == "10 YAG":
                earn_point["median10yr"] = safe_int(row["earnings_median"])
                emp_point["employment10yr"] = emp

        if earn_point.get("median1yr"):
            earnings_ts.append(earn_point)
        if emp_point.get("employment1yr"):
            employment_ts.append(emp_point)

    log.info(f"Earnings time series: {len(earnings_ts)} tax years")
    if earnings_ts:
        latest = earnings_ts[-1]
        log.info(f"  Latest ({latest['taxYear']}): 1yr={latest.get('median1yr')}, "
                 f"3yr={latest.get('median3yr')}, 5yr={latest.get('median5yr')}, "
                 f"10yr={latest.get('median10yr')}")

    # ── 2. By subject (latest year, 5 YAG) ─────────────────────────────
    latest_tp = max(time_periods)
    mask_subj = pd.Series(True, index=df.index)
    for col, val in TOTAL_FILTERS.items():
        mask_subj &= (df[col] == val)
    mask_subj &= (df["subject_name"] != "Total")
    mask_subj &= (df["time_period"] == latest_tp)
    mask_subj &= (df["YAG"] == "5 YAG")

    subjects = df[mask_subj].copy()
    log.info(f"Subject rows (5 YAG, latest year): {len(subjects)}")

    by_subject = []
    for _, row in subjects.iterrows():
        med = safe_int(row["earnings_median"])
        emp = safe_float(row["sust_emp_with_or_without_fs"])
        grads = safe_int(row["grads"])

        if med is not None and med > 0 and grads and grads >= 50:
            by_subject.append({
                "subject": row["subject_name"],
                "medianEarnings5yr": med,
                "employmentPct": emp,
                "graduates": grads,
            })

    by_subject.sort(key=lambda x: x["medianEarnings5yr"], reverse=True)
    log.info(f"Subjects with valid data: {len(by_subject)}")
    if by_subject:
        log.info(f"  Highest: {by_subject[0]['subject']} (£{by_subject[0]['medianEarnings5yr']:,})")
        log.info(f"  Lowest: {by_subject[-1]['subject']} (£{by_subject[-1]['medianEarnings5yr']:,})")

    # ── Output ────────────────────────────────────────────────────────────
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = {
        "earnings": {"timeSeries": earnings_ts},
        "employment": {"timeSeries": employment_ts},
        "bySubject": by_subject,
        "latestTaxYear": tp_to_tax_year(latest_tp),
        "metadata": {
            "sources": [{
                "name": "Department for Education",
                "dataset": "LEO Graduate and Postgraduate Outcomes (Tax year 2022-23)",
                "url": "https://explore-education-statistics.service.gov.uk/find-statistics/leo-graduate-and-postgraduate-outcomes",
                "frequency": "annual (by tax year)",
                "retrieved": datetime.now().isoformat(),
            }],
            "methodology": "Longitudinal Education Outcomes (LEO) data links education records to HMRC tax and DWP benefits data. Sustained employment = employed/self-employed for at least 1 day in 5 of 6 months. Earnings are median annualised gross pay.",
            "knownIssues": [
                "2020/21 tax year affected by COVID-19 furlough and reduced economic activity",
                "Subjects with <50 graduates suppressed for data protection",
                "Only UK-domiciled first-degree graduates included in these figures",
            ],
        },
    }

    out_path = OUTPUT_DIR / "graduate_outcomes.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"Wrote {out_path} ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
