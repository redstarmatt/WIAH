"""
Education — transform.py

Processes CSV files from DfE Explore Education Statistics into
data/output/education/education.json.

Sources:
  1. Pupil absence CSV → persistent absence + overall absence time series
  2. KS4 disadvantage gap CSV → disadvantage gap index 2010–2025
  3. KS4 characteristics CSV → Attainment 8 by FSM/disadvantage
  4. EHCP CSV → 20-week timeliness + new EHCPs issued
  5. Published SEN2 figures → total EHCP caseload time series (hardcoded)
"""

import json
import logging
from pathlib import Path

import pandas as pd

# ── Config ─────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "education"
OUTPUT_DIR = ROOT / "data" / "output" / "education"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def latest_raw(pattern: str) -> Path:
    """Find the most recently downloaded file matching a glob pattern."""
    files = sorted(RAW_DIR.glob(pattern))
    if not files:
        raise FileNotFoundError(f"No files matching {pattern} in {RAW_DIR}")
    return files[-1]


def fmt_year(tp) -> str:
    """Convert DfE time_period (201819) to display year (2018-19)."""
    s = str(tp)
    if len(s) == 6:
        return f"{s[:4]}-{s[4:]}"
    return s


# ── 1. PERSISTENT ABSENCE ──────────────────────────────────────────────────────

def extract_absence(path: Path) -> list[dict]:
    """
    National persistent absence rate and overall absence rate by academic year.
    Filter: geographic_level == 'National', education_phase == 'Total'.
    """
    log.info("Extracting absence data…")
    df = pd.read_csv(path, encoding="utf-8-sig")

    national = df[
        (df["geographic_level"] == "National") &
        (df["education_phase"] == "Total")
    ].copy()

    series = []
    for _, row in national.iterrows():
        year = fmt_year(row["time_period"])
        overall = row["sess_overall_percent"]
        persistent = row["enrolments_pa_10_exact_percent"]

        try:
            series.append({
                "year": year,
                "overallAbsencePct": round(float(overall), 2),
                "persistentAbsencePct": round(float(persistent), 2),
            })
        except (ValueError, TypeError):
            continue

    series.sort(key=lambda x: x["year"])
    log.info(f"  → {len(series)} data points ({series[0]['year']} to {series[-1]['year']})")
    log.info(f"  Latest persistent absence: {series[-1]['persistentAbsencePct']}%")
    return series


# ── 2. DISADVANTAGE GAP INDEX ──────────────────────────────────────────────────

def extract_gap_index(path: Path) -> list[dict]:
    """
    Disadvantage gap index: composite measure of the gap between disadvantaged
    pupils and all other pupils at KS4. Lower = smaller gap = better.
    """
    log.info("Extracting disadvantage gap index…")
    df = pd.read_csv(path, encoding="utf-8-sig")

    series = []
    for _, row in df.iterrows():
        year = fmt_year(row["time_period"])
        try:
            series.append({
                "year": year,
                "index": round(float(row["disadvantage_gap_index"]), 2),
            })
        except (ValueError, TypeError):
            continue

    series.sort(key=lambda x: x["year"])
    log.info(f"  → {len(series)} data points ({series[0]['year']} to {series[-1]['year']})")
    log.info(f"  Latest gap index: {series[-1]['index']}")
    return series


# ── 3. ATTAINMENT 8 BY FSM ────────────────────────────────────────────────────

def extract_attainment8(path: Path) -> list[dict]:
    """
    Attainment 8 average scores and grade 4+/5+ pass rates
    for disadvantaged vs all other pupils, national level.
    """
    log.info("Extracting Attainment 8 by disadvantage status…")
    df = pd.read_csv(path, encoding="utf-8-sig")

    # Filter to national, disadvantage characteristic group
    nat = df[
        (df["geographic_level"] == "National") &
        (df["characteristics_group"] == "Disadvantage")
    ].copy()

    # Pivot: for each year, get disadvantaged and other scores
    years = sorted(nat["time_period"].unique())
    series = []
    for tp in years:
        year_data = nat[nat["time_period"] == tp]
        disadv = year_data[year_data["characteristic"] == "Disadvantaged"]
        other = year_data[year_data["characteristic"] == "Disadvantaged all other"]

        if disadv.empty or other.empty:
            continue

        try:
            series.append({
                "year": fmt_year(tp),
                "disadvantagedAtt8": round(float(disadv.iloc[0]["avg_att8"]), 1),
                "otherAtt8": round(float(other.iloc[0]["avg_att8"]), 1),
                "disadvantagedGrade5Pct": round(float(disadv.iloc[0]["pt_l2basics_95"]), 1),
                "otherGrade5Pct": round(float(other.iloc[0]["pt_l2basics_95"]), 1),
                "disadvantagedGrade4Pct": round(float(disadv.iloc[0]["pt_l2basics_94"]), 1),
                "otherGrade4Pct": round(float(other.iloc[0]["pt_l2basics_94"]), 1),
            })
        except (ValueError, TypeError):
            continue

    log.info(f"  → {len(series)} data points ({series[0]['year']} to {series[-1]['year']})")
    log.info(f"  Latest gap: Att8 {series[-1]['otherAtt8']} vs {series[-1]['disadvantagedAtt8']}")
    return series


# ── 4. EHCP TIMELINESS ─────────────────────────────────────────────────────────

def extract_ehcp_timeliness(path: Path) -> list[dict]:
    """
    EHCP 20-week timeliness rate and new EHCPs issued, national level.
    """
    log.info("Extracting EHCP timeliness…")
    df = pd.read_csv(path, encoding="utf-8-sig")

    national = df[df["geographic_level"] == "National"].copy()
    national = national.sort_values("time_period")

    series = []
    for _, row in national.iterrows():
        year = int(row["time_period"])

        # 20-week timeliness (including exceptions)
        rate = row.get("inc_exc_20week_rate")
        new_ehcps = row.get("new_all_ehc")

        try:
            rate_val = round(float(rate), 1)
        except (ValueError, TypeError):
            rate_val = None

        try:
            new_val = int(float(new_ehcps))
        except (ValueError, TypeError):
            new_val = None

        if rate_val is not None:
            entry = {"year": year, "withinWeeks20Pct": rate_val}
            if new_val:
                entry["newEhcps"] = new_val
            series.append(entry)

    log.info(f"  → {len(series)} data points")
    if series:
        log.info(f"  Latest 20-week rate: {series[-1]['withinWeeks20Pct']}%")
    return series


# ── 5. LA-LEVEL ABSENCE ───────────────────────────────────────────────────────

def extract_la_absence(path: Path) -> list[dict]:
    """
    Persistent absence and overall absence rate by local authority,
    latest academic year. Used for regional choropleth on education page.
    """
    log.info("Extracting LA-level absence data…")
    df = pd.read_csv(path, encoding="utf-8-sig")

    la_data = df[
        (df["geographic_level"] == "Local authority") &
        (df["education_phase"] == "Total")
    ].copy()

    if la_data.empty:
        log.warning("  No 'Local authority' rows found in absence CSV — skipping")
        return []

    latest_tp = la_data["time_period"].max()
    la_latest = la_data[la_data["time_period"] == latest_tp]

    result = []
    for _, row in la_latest.iterrows():
        # DfE CSVs use new_la_code or old_la_code depending on release
        code = str(row.get("new_la_code", row.get("la_code", ""))).strip()
        name = str(row.get("la_name", "")).strip()
        if not code or code == "nan":
            continue

        try:
            persistent = round(float(row["enrolments_pa_10_exact_percent"]), 2)
            overall = round(float(row["sess_overall_percent"]), 2)
        except (ValueError, TypeError):
            continue

        result.append({
            "code": code,
            "name": name,
            "persistentAbsencePct": persistent,
            "overallAbsencePct": overall,
            "year": fmt_year(latest_tp),
        })

    result.sort(key=lambda x: x["name"])
    log.info(
        "  → %d local authorities for %s (persistent absence range: %.1f%%–%.1f%%)",
        len(result),
        fmt_year(latest_tp),
        min(r["persistentAbsencePct"] for r in result) if result else 0,
        max(r["persistentAbsencePct"] for r in result) if result else 0,
    )
    return result


# ── 6. EHCP CASELOAD (hardcoded published figures) ────────────────────────────

def build_ehcp_caseload() -> list[dict]:
    """
    Total EHCP caseload from DfE SEN2 annual returns.
    Source: DfE, Education, health and care plans (annual statistical release).
    2023 and 2024 from CSV data; earlier years from published SEN2 tables.
    """
    log.info("Building EHCP caseload from published SEN2 figures…")

    caseload = [
        {"year": 2015, "total": 240183},
        {"year": 2016, "total": 256720},
        {"year": 2017, "total": 282327},
        {"year": 2018, "total": 319819},
        {"year": 2019, "total": 354000},
        {"year": 2020, "total": 390109},
        {"year": 2021, "total": 430697},
        {"year": 2022, "total": 473255},
        {"year": 2023, "total": 517048},
        {"year": 2024, "total": 576474},
        {"year": 2025, "total": 631895},
    ]

    for c in caseload:
        log.info(f"    {c['year']}: {c['total']:,}")
    return caseload


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    log.info("=== Education transform.py ===")

    absence_path = latest_raw("*absence*.csv")
    gap_path = latest_raw("*ks4_gap*.csv")
    chars_path = latest_raw("*ks4_chars*.csv")
    ehcp_path = latest_raw("*ehcp*.csv")

    log.info(f"Absence: {absence_path.name}")
    log.info(f"KS4 gap: {gap_path.name}")
    log.info(f"KS4 chars: {chars_path.name}")
    log.info(f"EHCP: {ehcp_path.name}")

    # Extract all data
    absence = extract_absence(absence_path)
    la_absence = extract_la_absence(absence_path)
    gap_index = extract_gap_index(gap_path)
    attainment8 = extract_attainment8(chars_path)
    ehcp_timeliness = extract_ehcp_timeliness(ehcp_path)
    ehcp_caseload = build_ehcp_caseload()

    # Build output JSON
    output = {
        "topic": "education",
        "lastUpdated": pd.Timestamp.now().strftime("%Y-%m-%d"),
        "national": {
            "absence": {
                "timeSeries": absence,
            },
            "send": {
                "ehcpCaseload": ehcp_caseload,
                "timeliness": ehcp_timeliness,
            },
            "attainment": {
                "gapIndex": gap_index,
                "attainment8": attainment8,
            },
        },
        "regional": {
            "byLocalAuthority": {
                "absence": la_absence,
            },
        },
        "metadata": {
            "sources": [
                {
                    "name": "Department for Education",
                    "dataset": "Pupil absence in schools in England, 2023/24",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england",
                    "frequency": "annual",
                },
                {
                    "name": "Department for Education",
                    "dataset": "Key stage 4 performance, 2024/25",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance",
                    "frequency": "annual",
                },
                {
                    "name": "Department for Education",
                    "dataset": "Education, health and care plans, 2025",
                    "url": "https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans",
                    "frequency": "annual",
                },
            ],
            "methodology": (
                "Persistent absence defined as missing 10%+ of possible sessions. "
                "Disadvantage gap index is a composite measure of the attainment gap "
                "between disadvantaged pupils (FSM-eligible in past 6 years or looked-after) "
                "and all other pupils at Key Stage 4. Attainment 8 measures average "
                "achievement across 8 GCSE-level qualifications. EHCP timeliness "
                "measures the percentage of new plans issued within the 20-week "
                "statutory deadline. EHCP caseload is the total maintained EHCPs "
                "from the annual SEN2 return (January census)."
            ),
            "knownIssues": [
                "2019/20 and 2020/21 KS4 results based on centre/teacher assessed grades due to COVID-19.",
                "2020/21 absence data unreliable due to partial school closures and different attendance patterns.",
                "EHCP data collection method changed in 2023 from aggregate to person-level returns.",
                "Persistent absence definition changed in 2015/16 from 15% to 10% threshold.",
            ],
        },
    }

    out_path = OUTPUT_DIR / "education.json"
    out_path.write_text(json.dumps(output, indent=2))
    log.info(f"\n✓ Written to {out_path} ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
