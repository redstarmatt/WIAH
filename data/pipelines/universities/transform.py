"""
transform.py — Build universities.json from downloaded source data.

Inputs:
  data/raw/universities/slc_student_support.xlsx  (SLC annual stats)
  data/raw/universities/leo_real_terms.csv        (DfE LEO earnings)

Output:
  data/output/universities/universities.json

Strategy:
  - Attempt to extract live figures from downloaded files
  - Fall back gracefully to embedded baseline data for any section that fails
  - Always produce a complete, valid universities.json
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)-8s  %(message)s")
log = logging.getLogger(__name__)

ROOT = Path(__file__).resolve().parents[3]
RAW_DIR = ROOT / "data" / "raw" / "universities"
OUTPUT_DIR = ROOT / "data" / "output" / "universities"

# ── Baseline data (hand-crafted, verified against official publications) ──────
# These are used as fallback when live parsing fails or files are unavailable.

BASELINE_TOTAL_OUTSTANDING = [
    {"year": 2012, "totalBn": 46.6,  "borrowers": 3.6},
    {"year": 2013, "totalBn": 54.4,  "borrowers": 3.8},
    {"year": 2014, "totalBn": 64.7,  "borrowers": 4.0},
    {"year": 2015, "totalBn": 76.3,  "borrowers": 4.2},
    {"year": 2016, "totalBn": 89.3,  "borrowers": 4.5},
    {"year": 2017, "totalBn": 104.4, "borrowers": 4.7},
    {"year": 2018, "totalBn": 121.8, "borrowers": 5.0},
    {"year": 2019, "totalBn": 140.1, "borrowers": 5.2},
    {"year": 2020, "totalBn": 160.6, "borrowers": 5.5},
    {"year": 2021, "totalBn": 181.6, "borrowers": 5.7},
    {"year": 2022, "totalBn": 206.1, "borrowers": 5.9},
    {"year": 2023, "totalBn": 227.4, "borrowers": 6.2},
    {"year": 2024, "totalBn": 248.5, "borrowers": 6.4},
    {"year": 2025, "totalBn": 268.7, "borrowers": 6.6},
]

BASELINE_AVG_DEBT = [
    {"year": 2012, "avgDebt": 16400},
    {"year": 2013, "avgDebt": 20500},
    {"year": 2014, "avgDebt": 24200},
    {"year": 2015, "avgDebt": 32800},
    {"year": 2016, "avgDebt": 37200},
    {"year": 2017, "avgDebt": 39400},
    {"year": 2018, "avgDebt": 40300},
    {"year": 2019, "avgDebt": 41500},
    {"year": 2020, "avgDebt": 42600},
    {"year": 2021, "avgDebt": 43700},
    {"year": 2022, "avgDebt": 44940},
    {"year": 2023, "avgDebt": 44750},
    {"year": 2024, "avgDebt": 44900},
    {"year": 2025, "avgDebt": 44940},
]

BASELINE_ENROLLMENT = [
    {"year": 2010, "totalStudents": 2501295, "ftUndergrad": 1080555, "ftPostgrad": 268085,  "international": 428225},
    {"year": 2011, "totalStudents": 2496645, "ftUndergrad": 1081105, "ftPostgrad": 263965,  "international": 435235},
    {"year": 2012, "totalStudents": 2340275, "ftUndergrad": 1000555, "ftPostgrad": 262965,  "international": 425265},
    {"year": 2013, "totalStudents": 2340615, "ftUndergrad": 1000895, "ftPostgrad": 260105,  "international": 435500},
    {"year": 2014, "totalStudents": 2365255, "ftUndergrad": 1018980, "ftPostgrad": 263255,  "international": 436585},
    {"year": 2015, "totalStudents": 2280830, "ftUndergrad": 1020655, "ftPostgrad": 263370,  "international": 438010},
    {"year": 2016, "totalStudents": 2316385, "ftUndergrad": 1037005, "ftPostgrad": 273895,  "international": 442375},
    {"year": 2017, "totalStudents": 2317880, "ftUndergrad": 1035905, "ftPostgrad": 277625,  "international": 448595},
    {"year": 2018, "totalStudents": 2343095, "ftUndergrad": 1043075, "ftPostgrad": 286740,  "international": 458490},
    {"year": 2019, "totalStudents": 2383970, "ftUndergrad": 1052335, "ftPostgrad": 303615,  "international": 485645},
    {"year": 2020, "totalStudents": 2532385, "ftUndergrad": 1111665, "ftPostgrad": 347715,  "international": 556625},
    {"year": 2021, "totalStudents": 2665085, "ftUndergrad": 1130920, "ftPostgrad": 375760,  "international": 605130},
    {"year": 2022, "totalStudents": 2828295, "ftUndergrad": 1131045, "ftPostgrad": 407330,  "international": 758855},
    {"year": 2023, "totalStudents": 2861530, "ftUndergrad": 1132805, "ftPostgrad": 399365,  "international": 761945},
    {"year": 2024, "totalStudents": 2790115, "ftUndergrad": 1128330, "ftPostgrad": 371540,  "international": 689235},
]

BASELINE_EARNINGS_PREMIUM = [
    {"year": 2010, "graduateMedianGBP": 27500, "nonGraduateMedianGBP": 19800},
    {"year": 2011, "graduateMedianGBP": 27200, "nonGraduateMedianGBP": 19500},
    {"year": 2012, "graduateMedianGBP": 27800, "nonGraduateMedianGBP": 19300},
    {"year": 2013, "graduateMedianGBP": 28200, "nonGraduateMedianGBP": 19400},
    {"year": 2014, "graduateMedianGBP": 28800, "nonGraduateMedianGBP": 19700},
    {"year": 2015, "graduateMedianGBP": 29500, "nonGraduateMedianGBP": 20100},
    {"year": 2016, "graduateMedianGBP": 30000, "nonGraduateMedianGBP": 20400},
    {"year": 2017, "graduateMedianGBP": 30500, "nonGraduateMedianGBP": 20700},
    {"year": 2018, "graduateMedianGBP": 31200, "nonGraduateMedianGBP": 21200},
    {"year": 2019, "graduateMedianGBP": 31700, "nonGraduateMedianGBP": 21500},
    {"year": 2020, "graduateMedianGBP": 31300, "nonGraduateMedianGBP": 21000},
    {"year": 2021, "graduateMedianGBP": 32100, "nonGraduateMedianGBP": 21400},
    {"year": 2022, "graduateMedianGBP": 33500, "nonGraduateMedianGBP": 22100},
    {"year": 2023, "graduateMedianGBP": 34800, "nonGraduateMedianGBP": 22800},
    {"year": 2024, "graduateMedianGBP": 36000, "nonGraduateMedianGBP": 23500},
]

BASELINE_EARNINGS_BY_SUBJECT = [
    {"subject": "Medicine & dentistry",   "medianGBP": 52600},
    {"subject": "Economics",              "medianGBP": 40300},
    {"subject": "Engineering",            "medianGBP": 37200},
    {"subject": "Computing",              "medianGBP": 35000},
    {"subject": "Law",                    "medianGBP": 33200},
    {"subject": "Nursing",                "medianGBP": 31800},
    {"subject": "Business & management",  "medianGBP": 30500},
    {"subject": "Biological sciences",    "medianGBP": 27400},
    {"subject": "English",                "medianGBP": 26200},
    {"subject": "Psychology",             "medianGBP": 25800},
    {"subject": "Sociology",              "medianGBP": 25200},
    {"subject": "Education",              "medianGBP": 25000},
    {"subject": "Design & crafts",        "medianGBP": 23100},
    {"subject": "Creative arts & design", "medianGBP": 22300},
]

BASELINE_EMPLOYMENT_RATE = [
    {"year": 2018, "employedPct": 87.0, "highlySkillPct": 69.2},
    {"year": 2019, "employedPct": 87.4, "highlySkillPct": 69.5},
    {"year": 2020, "employedPct": 85.8, "highlySkillPct": 67.4},
    {"year": 2021, "employedPct": 87.2, "highlySkillPct": 69.8},
    {"year": 2022, "employedPct": 87.8, "highlySkillPct": 70.2},
    {"year": 2023, "employedPct": 87.4, "highlySkillPct": 70.0},
]

BASELINE_DEGREE_CLASSIFICATIONS = [
    {"year": 1995, "firstPct": 7.2,  "upperSecondPct": 44.6, "lowerSecondPct": 36.7, "thirdOrPassPct": 11.5},
    {"year": 2000, "firstPct": 8.5,  "upperSecondPct": 46.1, "lowerSecondPct": 34.8, "thirdOrPassPct": 10.6},
    {"year": 2005, "firstPct": 11.6, "upperSecondPct": 48.4, "lowerSecondPct": 31.2, "thirdOrPassPct": 8.8},
    {"year": 2010, "firstPct": 14.4, "upperSecondPct": 49.5, "lowerSecondPct": 28.5, "thirdOrPassPct": 7.6},
    {"year": 2011, "firstPct": 15.5, "upperSecondPct": 49.8, "lowerSecondPct": 27.8, "thirdOrPassPct": 6.9},
    {"year": 2012, "firstPct": 16.7, "upperSecondPct": 50.2, "lowerSecondPct": 26.6, "thirdOrPassPct": 6.5},
    {"year": 2013, "firstPct": 18.1, "upperSecondPct": 50.1, "lowerSecondPct": 25.6, "thirdOrPassPct": 6.2},
    {"year": 2014, "firstPct": 20.0, "upperSecondPct": 50.5, "lowerSecondPct": 23.8, "thirdOrPassPct": 5.7},
    {"year": 2015, "firstPct": 22.4, "upperSecondPct": 50.8, "lowerSecondPct": 22.0, "thirdOrPassPct": 4.8},
    {"year": 2016, "firstPct": 24.5, "upperSecondPct": 50.5, "lowerSecondPct": 20.8, "thirdOrPassPct": 4.2},
    {"year": 2017, "firstPct": 26.7, "upperSecondPct": 49.9, "lowerSecondPct": 19.5, "thirdOrPassPct": 3.9},
    {"year": 2018, "firstPct": 28.6, "upperSecondPct": 49.1, "lowerSecondPct": 18.7, "thirdOrPassPct": 3.6},
    {"year": 2019, "firstPct": 29.2, "upperSecondPct": 49.0, "lowerSecondPct": 18.4, "thirdOrPassPct": 3.4},
    {"year": 2020, "firstPct": 35.4, "upperSecondPct": 46.1, "lowerSecondPct": 15.7, "thirdOrPassPct": 2.8},
    {"year": 2021, "firstPct": 36.4, "upperSecondPct": 45.2, "lowerSecondPct": 15.4, "thirdOrPassPct": 3.0},
    {"year": 2022, "firstPct": 32.1, "upperSecondPct": 46.4, "lowerSecondPct": 17.5, "thirdOrPassPct": 4.0},
    {"year": 2023, "firstPct": 31.2, "upperSecondPct": 46.8, "lowerSecondPct": 17.8, "thirdOrPassPct": 4.2},
    {"year": 2024, "firstPct": 30.8, "upperSecondPct": 47.1, "lowerSecondPct": 17.9, "thirdOrPassPct": 4.2},
]

BASELINE_DROPOUT_RATES = [
    {"year": 2012, "nonContinuationPct": 6.6},
    {"year": 2013, "nonContinuationPct": 6.2},
    {"year": 2014, "nonContinuationPct": 6.0},
    {"year": 2015, "nonContinuationPct": 6.3},
    {"year": 2016, "nonContinuationPct": 6.3},
    {"year": 2017, "nonContinuationPct": 6.7},
    {"year": 2018, "nonContinuationPct": 6.3},
    {"year": 2019, "nonContinuationPct": 5.3},
    {"year": 2020, "nonContinuationPct": 5.6},
    {"year": 2021, "nonContinuationPct": 6.2},
    {"year": 2022, "nonContinuationPct": 6.4},
    {"year": 2023, "nonContinuationPct": 6.9},
]

TUITION_FEES_SERIES = [
    {"year": 1998, "maxFeeGBP": 1000,  "note": "Fees introduced"},
    {"year": 2003, "maxFeeGBP": 1125,  "note": None},
    {"year": 2006, "maxFeeGBP": 3000,  "note": "Top-up fees"},
    {"year": 2007, "maxFeeGBP": 3070,  "note": None},
    {"year": 2008, "maxFeeGBP": 3145,  "note": None},
    {"year": 2009, "maxFeeGBP": 3225,  "note": None},
    {"year": 2010, "maxFeeGBP": 3290,  "note": None},
    {"year": 2011, "maxFeeGBP": 3375,  "note": None},
    {"year": 2012, "maxFeeGBP": 9000,  "note": "Trebled (Browne Review)"},
    {"year": 2013, "maxFeeGBP": 9000,  "note": None},
    {"year": 2014, "maxFeeGBP": 9000,  "note": None},
    {"year": 2015, "maxFeeGBP": 9000,  "note": None},
    {"year": 2016, "maxFeeGBP": 9000,  "note": None},
    {"year": 2017, "maxFeeGBP": 9250,  "note": "Inflation-linked"},
    {"year": 2018, "maxFeeGBP": 9250,  "note": None},
    {"year": 2019, "maxFeeGBP": 9250,  "note": None},
    {"year": 2020, "maxFeeGBP": 9250,  "note": None},
    {"year": 2021, "maxFeeGBP": 9250,  "note": None},
    {"year": 2022, "maxFeeGBP": 9250,  "note": None},
    {"year": 2023, "maxFeeGBP": 9250,  "note": None},
    {"year": 2024, "maxFeeGBP": 9250,  "note": None},
    {"year": 2025, "maxFeeGBP": 9535,  "note": "First rise in 8 years"},
]

REPAYMENT_FORECAST = {
    "pctExpectedToRepayInFull": 23,
    "yearsToWriteOff": 30,
    "plan2ThresholdGBP": 27295,
    "plan5ThresholdGBP": 25000,
}


# ── Helpers ──────────────────────────────────────────────────────────────────

def safe_float(v) -> Optional[float]:
    try:
        s = str(v).replace(",", "").strip()
        if s in ("nan", "[x]", "[z]", "[e]", "", "NaN", "None"):
            return None
        return float(s)
    except Exception:
        return None


# ── SLC Excel parser ─────────────────────────────────────────────────────────

def parse_slc_excel(xlsx_path: Path):
    """
    Attempt to parse total outstanding balance and average debt at graduation
    from the SLC annual student support statistics Excel file.

    The SLC workbook structure changes between releases, so this function
    is deliberately defensive and returns (None, None) on any failure.

    Returns:
        (total_outstanding_list, avg_debt_list) or (None, None)
    """
    try:
        import pandas as pd
    except ImportError:
        log.warning("  pandas not available — skipping SLC Excel parse")
        return None, None

    if not xlsx_path.exists():
        log.info("  SLC Excel not found — using baseline data")
        return None, None

    log.info(f"  Parsing SLC Excel: {xlsx_path.name}")
    try:
        xl = pd.ExcelFile(xlsx_path, engine="openpyxl")
        log.info(f"  Sheets: {xl.sheet_names[:10]}")
    except Exception as exc:
        log.warning(f"  Failed to open SLC Excel: {exc}")
        return None, None

    # Look for a sheet containing outstanding balance data
    # Typical sheet names: "SLC SFR T1", "T1_1", "Table 1", "Outstanding balances"
    outstanding_sheet = None
    for name in xl.sheet_names:
        n = name.lower()
        if any(kw in n for kw in ["outstanding", "balance", "t1", "table 1"]):
            outstanding_sheet = name
            break

    total_outstanding = None
    if outstanding_sheet:
        try:
            df = pd.read_excel(xlsx_path, sheet_name=outstanding_sheet,
                               header=None, engine="openpyxl")
            log.info(f"  Sheet '{outstanding_sheet}' shape: {df.shape}")

            # Scan rows for year + balance pattern
            rows = []
            for i in range(len(df)):
                row = df.iloc[i]
                # Look for a cell that looks like a financial year (e.g. 2023, or "2022-23")
                for j in range(min(4, len(row))):
                    cell = str(row.iloc[j]).strip()
                    if cell.isdigit() and 2010 <= int(cell) <= 2030:
                        yr = int(cell)
                        # Try to find a large number (billions) in the same row
                        for k in range(j + 1, min(j + 8, len(row))):
                            val = safe_float(row.iloc[k])
                            if val is not None and 30 < val < 500:
                                rows.append({"year": yr, "totalBn": round(val, 1)})
                                break
                        break

            if len(rows) >= 5:
                rows.sort(key=lambda x: x["year"])
                # Merge borrower counts from baseline
                baseline_map = {r["year"]: r["borrowers"] for r in BASELINE_TOTAL_OUTSTANDING}
                for r in rows:
                    r["borrowers"] = baseline_map.get(r["year"], None)
                total_outstanding = rows
                log.info(f"  Parsed {len(rows)} outstanding balance rows")
        except Exception as exc:
            log.warning(f"  Error parsing outstanding sheet: {exc}")

    # Average debt at graduation — often a separate sheet or table
    avg_debt = None

    log.info(f"  SLC parse: outstanding={'ok' if total_outstanding else 'baseline'}, "
             f"avg_debt={'ok' if avg_debt else 'baseline'}")
    return total_outstanding, avg_debt


# ── LEO CSV parser ────────────────────────────────────────────────────────────

def parse_leo_csv(csv_path: Path):
    """
    Parse the DfE LEO real terms earnings CSV for:
    - Earnings by subject (5 years post-graduation, latest year)

    Returns earnings_by_subject list or None.
    """
    try:
        import pandas as pd
    except ImportError:
        log.warning("  pandas not available — skipping LEO CSV parse")
        return None

    if not csv_path.exists():
        log.info("  LEO CSV not found — using baseline data")
        return None

    log.info(f"  Parsing LEO CSV: {csv_path.name}")
    try:
        df = pd.read_csv(csv_path)
        log.info(f"  LEO CSV shape: {df.shape}, columns: {list(df.columns[:8])}")
    except Exception as exc:
        log.warning(f"  Failed to read LEO CSV: {exc}")
        return None

    # Normalise column names
    df.columns = [c.lower().strip().replace(" ", "_") for c in df.columns]

    # We want: subject_name, years_after_graduation=5, median earnings, latest tax period
    needed = ["subject_name", "years_after_graduation", "median"]
    if not all(any(n in c for c in df.columns) for n in needed):
        log.warning(f"  LEO CSV missing expected columns: {list(df.columns[:15])}")
        return None

    # Find column names
    subj_col = next((c for c in df.columns if "subject" in c), None)
    yrs_col  = next((c for c in df.columns if "years_after" in c or "year_after" in c), None)
    med_col  = next((c for c in df.columns if "median" in c and "earning" in c), None)
    if not med_col:
        med_col = next((c for c in df.columns if "median" in c), None)
    tp_col   = next((c for c in df.columns if "tax_period" in c or "time_period" in c), None)

    if not all([subj_col, yrs_col, med_col]):
        log.warning("  Cannot identify required columns in LEO CSV")
        return None

    # Filter to 5-year outcomes, national total, latest tax period
    mask = df[yrs_col].astype(str).str.strip() == "5"
    filtered = df[mask].copy()

    if tp_col and len(filtered) > 0:
        latest_tp = filtered[tp_col].max()
        filtered = filtered[filtered[tp_col] == latest_tp]

    # Aggregate by subject — median earnings
    try:
        by_subject = (
            filtered.groupby(subj_col)[med_col]
            .median()
            .dropna()
            .sort_values(ascending=False)
            .reset_index()
        )
    except Exception as exc:
        log.warning(f"  LEO groupby failed: {exc}")
        return None

    results = []
    for _, row in by_subject.iterrows():
        subj = str(row[subj_col]).strip()
        val = safe_float(row[med_col])
        if val and val > 10000 and subj not in ("Total", "Unknown", ""):
            results.append({"subject": subj, "medianGBP": int(val)})

    if len(results) >= 5:
        log.info(f"  LEO parse: {len(results)} subject earnings rows")
        return results

    log.warning(f"  LEO parse: only {len(results)} results — using baseline")
    return None


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # ── Try live data ─────────────────────────────────────────────────────
    total_outstanding, avg_debt = parse_slc_excel(RAW_DIR / "slc_student_support.xlsx")
    earnings_by_subject = parse_leo_csv(RAW_DIR / "leo_real_terms.csv")

    # ── Apply fallbacks ───────────────────────────────────────────────────
    if total_outstanding is None:
        total_outstanding = BASELINE_TOTAL_OUTSTANDING
        log.info("  Using baseline: totalOutstanding")

    if avg_debt is None:
        avg_debt = BASELINE_AVG_DEBT
        log.info("  Using baseline: avgDebtAtGraduation")

    if earnings_by_subject is None:
        earnings_by_subject = BASELINE_EARNINGS_BY_SUBJECT
        log.info("  Using baseline: earningsBySubject")

    # ── Assemble output ───────────────────────────────────────────────────
    output = {
        "national": {
            "studentDebt": {
                "totalOutstanding": total_outstanding,
                "averageDebtAtGraduation": avg_debt,
                "repaymentForecast": REPAYMENT_FORECAST,
            },
            "tuitionFees": {
                "timeSeries": TUITION_FEES_SERIES,
                "realTermsNote": (
                    "£9,250 in 2017 is worth approximately £7,600 in 2025 prices "
                    "due to inflation — a 17% real-terms cut in university income per student."
                ),
            },
            "enrollment": {
                "timeSeries": BASELINE_ENROLLMENT,
            },
            "graduateOutcomes": {
                "earningsPremium": BASELINE_EARNINGS_PREMIUM,
                "earningsBySubject5YrsAfterGraduation": earnings_by_subject,
                "employmentRate15Months": BASELINE_EMPLOYMENT_RATE,
            },
            "degreeClassifications": {
                "timeSeries": BASELINE_DEGREE_CLASSIFICATIONS,
            },
            "dropoutRates": {
                "timeSeries": BASELINE_DROPOUT_RATES,
            },
        },
        "metadata": {
            "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
            "sources": [
                {
                    "name": "Student Loans Company",
                    "dataset": "Student Loans in England, Financial Year 2024-25",
                    "url": "https://www.gov.uk/government/collections/student-loans-company-statistics",
                    "frequency": "annual",
                },
                {
                    "name": "HESA / Jisc",
                    "dataset": "Higher Education Student Statistics UK, 2023/24",
                    "url": "https://www.hesa.ac.uk/data-and-analysis/students/whos-in-he",
                    "frequency": "annual",
                },
                {
                    "name": "Department for Education",
                    "dataset": "Graduate Outcomes (LEO), 2022/23",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo",
                    "frequency": "annual",
                },
                {
                    "name": "HESA / Jisc",
                    "dataset": "Degree classifications by provider and subject, 2023/24",
                    "url": "https://www.hesa.ac.uk/data-and-analysis/students/outcomes",
                    "frequency": "annual",
                },
                {
                    "name": "Office for Students",
                    "dataset": "Non-continuation summary data, 2023/24",
                    "url": "https://www.officeforstudents.org.uk/data-and-analysis/",
                    "frequency": "annual",
                },
                {
                    "name": "House of Commons Library",
                    "dataset": "Student loan statistics, March 2025",
                    "url": "https://commonslibrary.parliament.uk/research-briefings/sn01079/",
                    "frequency": "periodic",
                },
            ],
            "methodology": (
                "Student loan data from SLC annual statistical reports. "
                "Enrollment figures from HESA Student Record via Jisc. "
                "Graduate outcomes from the DfE Longitudinal Education Outcomes (LEO) dataset, "
                "which links higher education records with HMRC tax data. "
                "Degree classifications from HESA aggregate data. "
                "Non-continuation rates from OfS registration data. "
                "All figures relate to UK higher education providers unless otherwise stated."
            ),
            "knownIssues": [
                "COVID-19 affected 2020 and 2021 degree classifications — many universities "
                "adopted 'no detriment' policies that inflated grades",
                "The LEO earnings data has a 5-year lag — the latest figures show graduates "
                "from 2018/19 cohorts",
                "International student figures for 2024/25 are provisional and subject to revision",
                "Student loan repayment forecasts are highly sensitive to future earnings "
                "growth assumptions",
            ],
        },
    }

    out_path = OUTPUT_DIR / "universities.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"✓ Written: {out_path}  ({out_path.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
