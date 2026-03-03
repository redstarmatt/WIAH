"""
transform.py — Parse ONS cancer survival data.

Outputs:
1. Cancer survival by type (latest period 2013-2017) — 1yr + 5yr, age-standardised
2. Time trend for key cancers across rolling 5-year periods (backseries + latest)

Sources:
  - Latest file: cancer_survival_latest.xlsx (2013-2017)
  - Backseries: cancer_survival_backseries.xlsx (2006-2010 to 2011-2015, consistent methodology)
"""

import json
import logging
import pandas as pd
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "cancer-survival"
OUTPUT_DIR = ROOT / "data" / "output" / "health"

# Key cancers for the time trend chart
TREND_CANCERS = {
    "Lung": {"sex": "Persons"},
    "Colorectal": {"sex": "Persons"},
    "Breast": {"sex": "Women"},
    "Prostate": {"sex": "Men"},
    "Pancreas": {"sex": "Persons"},
    "Melanoma": {"sex": "Persons", "alt_names": ["Melanoma of Skin"]},
}


def safe_float(v):
    try:
        f = float(v)
        return round(f, 1) if not pd.isna(f) else None
    except (ValueError, TypeError):
        return None


def period_midpoint(period_str):
    """Convert '2006-2010' → 2008 (midpoint year)."""
    parts = period_str.split("-")
    if len(parts) == 2:
        return (int(parts[0]) + int(parts[1])) // 2
    return int(parts[0])


def extract_by_type(xlsx_path):
    """Extract latest survival rates by cancer type from the summary table."""
    df = pd.read_excel(xlsx_path, sheet_name="1. Summary table - Age group", header=None)
    df[0] = df[0].ffill()
    df[1] = df[1].ffill()

    results = []
    seen = set()

    for i in range(8, df.shape[0]):
        cancer = str(df.iloc[i, 0]).strip() if pd.notna(df.iloc[i, 0]) else ""
        sex = str(df.iloc[i, 1]).strip() if pd.notna(df.iloc[i, 1]) else ""
        age = str(df.iloc[i, 2]).strip() if pd.notna(df.iloc[i, 2]) else ""

        # Skip non-cancer rows
        if not cancer or cancer.startswith("Notes") or cancer.startswith("Source") or cancer.startswith("1.") or cancer.startswith("2."):
            continue

        if "standardised" not in age.lower() or "Non-" in age:
            continue

        # Use Persons where available; use sex-specific for Breast/Prostate/Cervix/Ovary/Testis/Uterus/Vulva
        sex_specific = ["Breast", "Prostate", "Cervix", "Ovary", "Testis", "Uterus", "Vulva"]
        is_sex_specific = cancer in sex_specific

        if is_sex_specific:
            if cancer in ["Breast", "Cervix", "Ovary", "Uterus", "Vulva"] and sex != "Women":
                continue
            if cancer in ["Prostate", "Testis"] and sex != "Men":
                continue
        else:
            if sex != "Persons":
                continue

        key = cancer
        if key in seen:
            continue
        seen.add(key)

        one_yr = safe_float(df.iloc[i, 5])
        five_yr = safe_float(df.iloc[i, 8])
        patients = safe_float(df.iloc[i, 4])

        if one_yr is not None:
            results.append({
                "site": cancer,
                "sex": sex,
                "oneYearSurvival": one_yr,
                "fiveYearSurvival": five_yr,
                "patients": int(patients) if patients else None,
            })

    # Sort by 5yr survival (nulls at end)
    results.sort(key=lambda x: x["fiveYearSurvival"] if x["fiveYearSurvival"] is not None else -1, reverse=True)
    return results


def extract_trend(backseries_path, latest_path):
    """Extract time trend for key cancers from backseries + latest file."""
    trends = {}

    # 1. Read backseries collated data (periods 2006-2010 through 2011-2015)
    if backseries_path.exists():
        df = pd.read_excel(backseries_path, sheet_name="Table 7 - Collated Data", header=None)
        df[0] = df[0].ffill()  # cohort
        df[1] = df[1].ffill()  # cancer
        df[2] = df[2].ffill()  # sex

        for cancer_name, cfg in TREND_CANCERS.items():
            alt_names = cfg.get("alt_names", [])
            match_names = [cancer_name] + alt_names
            sex_match = cfg["sex"]

            points = []
            for i in range(4, df.shape[0]):
                cohort = str(df.iloc[i, 0]).strip() if pd.notna(df.iloc[i, 0]) else ""
                cancer = str(df.iloc[i, 1]).strip() if pd.notna(df.iloc[i, 1]) else ""
                sex = str(df.iloc[i, 2]).strip() if pd.notna(df.iloc[i, 2]) else ""
                age = str(df.iloc[i, 3]).strip() if pd.notna(df.iloc[i, 3]) else ""

                if cancer not in match_names:
                    continue
                # Handle Persons vs Male/Female
                if sex_match == "Persons" and sex != "Persons":
                    continue
                if sex_match == "Women" and sex != "Female":
                    continue
                if sex_match == "Men" and sex != "Male":
                    continue
                if "standardised" not in age.lower() or "Non-" in age:
                    continue

                one_yr = safe_float(df.iloc[i, 5])
                five_yr = safe_float(df.iloc[i, 8])

                if one_yr is not None and cohort:
                    points.append({
                        "period": cohort,
                        "midYear": period_midpoint(cohort),
                        "oneYearSurvival": one_yr,
                        "fiveYearSurvival": five_yr,
                    })

            if points:
                trends[cancer_name] = points

    # 2. Add latest (2013-2017) from the main file
    if latest_path.exists():
        df = pd.read_excel(latest_path, sheet_name="1. Summary table - Age group", header=None)
        df[0] = df[0].ffill()
        df[1] = df[1].ffill()

        for cancer_name, cfg in TREND_CANCERS.items():
            alt_names = cfg.get("alt_names", [])
            match_names = [cancer_name] + alt_names
            sex_match = cfg["sex"]

            for i in range(8, df.shape[0]):
                cancer = str(df.iloc[i, 0]).strip() if pd.notna(df.iloc[i, 0]) else ""
                sex = str(df.iloc[i, 1]).strip() if pd.notna(df.iloc[i, 1]) else ""
                age = str(df.iloc[i, 2]).strip() if pd.notna(df.iloc[i, 2]) else ""

                if cancer not in match_names:
                    continue
                if sex != sex_match:
                    continue
                if "standardised" not in age.lower() or "Non-" in age:
                    continue

                one_yr = safe_float(df.iloc[i, 5])
                five_yr = safe_float(df.iloc[i, 8])

                if one_yr is not None:
                    if cancer_name not in trends:
                        trends[cancer_name] = []
                    # Avoid duplicate if midpoint already exists
                    existing = {p["period"] for p in trends[cancer_name]}
                    if "2013-2017" not in existing:
                        trends[cancer_name].append({
                            "period": "2013-2017",
                            "midYear": 2015,
                            "oneYearSurvival": one_yr,
                            "fiveYearSurvival": five_yr,
                        })
                break

    # Sort each trend by midYear
    for k in trends:
        trends[k].sort(key=lambda x: x["midYear"])

    return trends


def main():
    latest_path = RAW_DIR / "cancer_survival_latest.xlsx"
    backseries_path = RAW_DIR / "cancer_survival_backseries.xlsx"

    if not latest_path.exists():
        log.error(f"File not found: {latest_path}")
        raise SystemExit(1)

    # Extract by-type breakdown
    by_type = extract_by_type(latest_path)
    log.info(f"Extracted {len(by_type)} cancer sites from latest file")
    if by_type:
        best = by_type[0]
        worst = by_type[-1]
        log.info(f"  Best 5yr: {best['site']} ({best['fiveYearSurvival']}%)")
        log.info(f"  Worst 5yr: {worst['site']} ({worst['fiveYearSurvival']}%)")

    # Extract trends
    trends = extract_trend(backseries_path, latest_path)
    log.info(f"Extracted trends for {len(trends)} cancer types")
    for name, points in trends.items():
        log.info(f"  {name}: {len(points)} data points ({points[0]['period']} to {points[-1]['period']})")

    # Build output
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = {
        "byCancerSite": by_type,
        "trends": {
            name: points for name, points in trends.items()
        },
        "latestPeriod": "2013-2017",
        "metadata": {
            "sources": [{
                "name": "Office for National Statistics",
                "dataset": "Cancer survival in England — adults diagnosed 2013–2017",
                "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/conditionsanddiseases/datasets/cancersurvivalratescancersurvivalinenglandadultsdiagnosed",
                "frequency": "annual (with ~2yr publication lag)",
                "retrieved": datetime.now().isoformat(),
            }],
            "methodology": "Net survival (age-standardised) using the Pohar Perme estimator. 5-year rolling cohort periods. Persons where available; sex-specific for Breast (Women), Prostate (Men), etc.",
            "knownIssues": [
                "Methodology changed in 2016 (back-series recalculated from 2006-2010 onwards)",
                "Publication lag: latest data covers patients diagnosed 2013-2017",
                "':' in source data means insufficient data for robust estimate",
            ],
        },
    }

    out_path = OUTPUT_DIR / "cancer_survival.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"Wrote {out_path} ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
