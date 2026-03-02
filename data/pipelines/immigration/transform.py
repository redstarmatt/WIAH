"""
Immigration data pipeline -- transform.py

Reads raw downloads and produces immigration.json with:
  - Net migration time series (ONS LTIM)
  - Net migration by reason (ONS LTIM sheet 4b)
  - Visa grants by route (Home Office)
  - Asylum overview (applications, decisions, backlog, grant rate)
  - Small boat crossings (daily aggregated to annual)
  - Returns (enforced vs voluntary)
"""

import json
import logging
import re
from datetime import date
from pathlib import Path

import pandas as pd
import numpy as np

LOG_FORMAT = "%(asctime)s  %(levelname)-5s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

RAW = Path(__file__).resolve().parent.parent.parent / "raw" / "immigration"
OUTPUT = Path(__file__).resolve().parent.parent.parent / "output" / "immigration"
OUTPUT.mkdir(parents=True, exist_ok=True)

TODAY = date.today().isoformat()


def find_latest(prefix, ext="ods"):
    """Find the most recent downloaded file matching prefix."""
    candidates = sorted(RAW.glob(f"*_{prefix}.{ext}"), reverse=True)
    if not candidates:
        raise FileNotFoundError(f"No file matching *_{prefix}.{ext} in {RAW}")
    return candidates[0]


def clean_val(v):
    """Convert a cell value to int or float, handling markers like [p], [R], z, :, etc."""
    if v is None or v == "" or v == "z" or v == ":" or v == ".." or v == "..":
        return None
    s = str(v).strip()
    # Remove provisional/revised markers
    s = re.sub(r'\s*\[.*?\]\s*', '', s)
    s = s.replace(",", "").replace(" ", "")
    if s == "" or s == "-" or s == "z" or s == ":":
        return None
    try:
        f = float(s)
        if f == int(f):
            return int(f)
        return round(f, 1)
    except (ValueError, TypeError):
        return None


def parse_period(p):
    """Parse ONS period like 'YE Jun 25' to a sortable string like '2025-Q2'."""
    s = str(p).strip()
    s = re.sub(r'\s*\[.*?\]\s*', '', s)  # remove [P], [R] etc
    s = s.strip()
    m = re.match(r'YE\s+(Mar|Jun|Sep|Dec)\s+(\d{2})', s)
    if not m:
        return None
    month_map = {"Mar": ("Q1", "03"), "Jun": ("Q2", "06"), "Sep": ("Q3", "09"), "Dec": ("Q4", "12")}
    quarter, mm = month_map[m.group(1)]
    yr = int(m.group(2))
    year = 2000 + yr if yr < 50 else 1900 + yr
    return f"{year}-{mm}"


# --- 1. Net migration time series ---

def extract_net_migration():
    """Extract net migration from ONS LTIM sheet 1."""
    f = find_latest("ons_ltim", "xlsx")
    log.info(f"  Reading ONS LTIM: {f.name}")

    df = pd.read_excel(f, sheet_name="1", header=None, engine="openpyxl")

    # Find header row — headers contain newlines like "Flow\n[note 2]"
    header_idx = None
    for i in range(min(15, len(df))):
        row_vals = [str(v).strip().lower().split("\n")[0] for v in df.iloc[i].values if pd.notna(v)]
        if "flow" in row_vals:
            header_idx = i
            break

    if header_idx is None:
        log.error("  Could not find header row in LTIM sheet 1")
        return []

    # Clean header names: take text before newline
    raw_headers = df.iloc[header_idx].values
    clean_headers = []
    for h in raw_headers:
        s = str(h).split("\n")[0].strip() if pd.notna(h) else ""
        clean_headers.append(s)
    df.columns = clean_headers
    df = df.iloc[header_idx + 1:].reset_index(drop=True)

    results = []
    for _, row in df.iterrows():
        flow = str(row.get("Flow", "")).strip()
        if flow not in ("Immigration", "Emigration", "Net migration"):
            continue
        period_raw = str(row.get("Period", "")).strip()
        period = parse_period(period_raw)
        if not period:
            continue
        all_nat = clean_val(row.get("All Nationalities", None))
        british = clean_val(row.get("British", None))
        eu = clean_val(row.get("EU+", None))
        non_eu = clean_val(row.get("Non-EU+", None))

        results.append({
            "period": period,
            "flow": flow.lower().replace(" ", "_"),
            "all": all_nat,
            "british": british,
            "eu": eu,
            "nonEu": non_eu,
        })

    log.info(f"  Net migration: {len(results)} rows extracted")
    return results


# --- 2. Net migration by reason (non-EU+) ---

def extract_migration_by_reason():
    """Extract migration by reason from LTIM sheet 4b (non-EU+)."""
    f = find_latest("ons_ltim", "xlsx")
    log.info(f"  Reading LTIM sheet 4b (non-EU+ by reason)")

    df = pd.read_excel(f, sheet_name="4b", header=None, engine="openpyxl")

    # Find header row — headers contain newlines
    header_idx = None
    for i in range(min(15, len(df))):
        row_vals = [str(v).strip().lower().split("\n")[0] for v in df.iloc[i].values if pd.notna(v)]
        if "flow" in row_vals:
            header_idx = i
            break

    if header_idx is None:
        log.error("  Could not find header row in LTIM sheet 4b")
        return []

    # Clean header names
    raw_headers = df.iloc[header_idx].values
    clean_headers = []
    for h in raw_headers:
        s = str(h).split("\n")[0].strip() if pd.notna(h) else ""
        clean_headers.append(s)
    df.columns = clean_headers
    df = df.iloc[header_idx + 1:].reset_index(drop=True)

    # Map column names to simpler keys
    col_map = {}
    for c in df.columns:
        cl = str(c).lower()
        if "all work" in cl:
            col_map["work"] = c
        elif "all study" in cl:
            col_map["study"] = c
        elif cl == "family":
            col_map["family"] = c
        elif "all humanitarian" in cl:
            col_map["humanitarian"] = c
        elif cl == "asylum":
            col_map["asylum"] = c
        elif cl == "other":
            col_map["other"] = c
        elif "all reasons" in cl:
            col_map["total"] = c

    results = []
    for _, row in df.iterrows():
        flow = str(row.get("Flow", "")).strip()
        period_raw = str(row.get("Period", "")).strip()
        period = parse_period(period_raw)
        if not period or flow not in ("Immigration", "Emigration", "Net migration"):
            continue

        entry = {"period": period, "flow": flow.lower().replace(" ", "_")}
        for key, col in col_map.items():
            entry[key] = clean_val(row.get(col, None))
        results.append(entry)

    log.info(f"  Migration by reason: {len(results)} rows")
    return results


# --- 3. Visa grants by route ---

def extract_visa_grants():
    """Extract visa grants by type from Home Office visa summary.

    Vis_01 has visa types as ROWS and years as COLUMNS:
    Row 4: "Visa type", 2014, 2015, ..., "Year ending December 2025", "Difference", "Percent Difference"
    Row 5: "Work visas", 167146, 165900, ...
    """
    f = find_latest("visa_summary", "ods")
    log.info(f"  Reading visa summary: {f.name}")

    df = pd.read_excel(f, sheet_name="Vis_01", header=None, engine="odf")

    # Find header row containing "Visa type"
    header_idx = None
    for i in range(min(10, len(df))):
        row_vals = [str(v).strip().lower() for v in df.iloc[i].values if pd.notna(v)]
        if any("visa type" in v for v in row_vals):
            header_idx = i
            break

    if header_idx is None:
        log.error("  Could not find header in Vis_01")
        return []

    # Extract years from header row
    header_vals = df.iloc[header_idx].values
    years = []
    year_col_indices = []
    for j, v in enumerate(header_vals):
        if j == 0:
            continue
        yr = clean_val(v)
        if yr and isinstance(yr, (int, float)) and 2010 <= yr <= 2030:
            years.append(int(yr))
            year_col_indices.append(j)
        else:
            # Try extracting year from "Year ending December 2025"
            m = re.search(r'(\d{4})', str(v))
            if m:
                candidate = int(m.group(1))
                if 2010 <= candidate <= 2030 and candidate not in years:
                    years.append(candidate)
                    year_col_indices.append(j)

    # Extract key visa categories from rows
    data_rows = df.iloc[header_idx + 1:].reset_index(drop=True)

    # Map row labels to our keys
    row_map = {
        "work visas": "work",
        "study visas": "study",
        "sponsored study": "studySponsored",
        "family visas": "family",
        "visitor visas": "visitor",
        "ukraine schemes": "ukraine",
        "total": "total",
    }

    # Build per-year data
    year_data = {yr: {"year": yr} for yr in years}

    for _, row in data_rows.iterrows():
        label = str(row.values[0]).strip().lower() if pd.notna(row.values[0]) else ""
        key = None
        for pattern, k in row_map.items():
            if label == pattern or label.startswith(pattern):
                key = k
                break
        if not key:
            continue

        for idx, yr in zip(year_col_indices, years):
            val = clean_val(row.values[idx])
            if val is not None:
                year_data[yr][key] = val

    results = sorted(year_data.values(), key=lambda x: x["year"])
    log.info(f"  Visa grants: {len(results)} years")
    return results


# --- 4. Asylum overview ---

def extract_asylum():
    """Extract asylum overview from Home Office asylum summary."""
    f = find_latest("asylum_summary", "ods")
    log.info(f"  Reading asylum summary: {f.name}")

    df = pd.read_excel(f, sheet_name="Asy_00a", header=None, engine="odf")

    # This sheet has metrics as rows and years as columns
    # Find the row with years
    year_row_idx = None
    for i in range(min(10, len(df))):
        vals = [clean_val(v) for v in df.iloc[i].values[1:] if clean_val(v) is not None]
        if any(2010 <= v <= 2030 for v in vals if isinstance(v, (int, float))):
            year_row_idx = i
            break

    if year_row_idx is None:
        log.error("  Could not find year row in Asy_00a")
        return {}

    years = []
    for v in df.iloc[year_row_idx].values[1:]:
        yr = clean_val(v)
        if yr and isinstance(yr, (int, float)) and 2000 <= yr <= 2030:
            years.append(int(yr))
        else:
            years.append(None)

    # Extract key metrics
    metrics = {}
    metric_patterns = {
        "applications": "claiming asylum",
        "decisions": "receiving initial decision",
        "grants": "grant.*protection",
        "refusals": "refusal",
        "grantRate": "grant rate",
        "backlogPeople": r"people awaiting.*initial decision",
        "backlogCases": r"cases awaiting.*initial decision",
    }

    for _, row in df.iterrows():
        label = str(row.values[0]).strip().lower() if pd.notna(row.values[0]) else ""
        for key, pattern in metric_patterns.items():
            if re.search(pattern, label, re.IGNORECASE):
                if key not in metrics:
                    metrics[key] = {}
                    for j, yr in enumerate(years):
                        if yr and j + 1 < len(row.values):
                            val = clean_val(row.values[j + 1])
                            if val is not None:
                                metrics[key][yr] = val

    # Build time series
    all_years = sorted(set(yr for m in metrics.values() for yr in m.keys()))
    series = []
    for yr in all_years:
        entry = {"year": yr}
        for key in metrics:
            entry[key] = metrics[key].get(yr)
        series.append(entry)

    log.info(f"  Asylum: {len(series)} years, metrics: {list(metrics.keys())}")
    return series


# --- 5. Small boat crossings ---

def extract_small_boats():
    """Extract small boat crossings from daily data, aggregate to annual."""
    f = find_latest("small_boats", "ods")
    log.info(f"  Reading small boats: {f.name}")

    df = pd.read_excel(f, sheet_name="SB_01", header=None, engine="odf")

    # Find header row
    header_idx = None
    for i in range(min(10, len(df))):
        row_vals = [str(v).strip().lower() for v in df.iloc[i].values if pd.notna(v)]
        if "date" in row_vals:
            header_idx = i
            break

    if header_idx is None:
        log.error("  Could not find header in SB_01")
        return {}

    df.columns = [str(c).strip() for c in df.iloc[header_idx].values]
    df = df.iloc[header_idx + 1:].reset_index(drop=True)

    # Parse dates and migrants
    date_col = [c for c in df.columns if "date" in c.lower()][0]
    migrant_col = [c for c in df.columns if "migrant" in c.lower()][0]
    boat_col = [c for c in df.columns if "boat" in c.lower()][0]

    annual = {}
    total_all = 0
    for _, row in df.iterrows():
        try:
            d = pd.to_datetime(row[date_col])
        except Exception:
            continue
        migrants = clean_val(row.get(migrant_col, 0))
        boats = clean_val(row.get(boat_col, 0))
        if migrants is None:
            migrants = 0
        if boats is None:
            boats = 0

        yr = d.year
        if yr not in annual:
            annual[yr] = {"year": yr, "migrants": 0, "boats": 0, "crossingDays": 0}
        annual[yr]["migrants"] += migrants
        annual[yr]["boats"] += boats
        if migrants > 0:
            annual[yr]["crossingDays"] += 1
        total_all += migrants

    result = sorted(annual.values(), key=lambda x: x["year"])
    log.info(f"  Small boats: {len(result)} years, total all-time: {total_all:,}")
    return result


# --- 6. Returns ---

def extract_returns():
    """Extract returns from Home Office returns summary."""
    f = find_latest("returns_summary", "ods")
    log.info(f"  Reading returns summary: {f.name}")

    df = pd.read_excel(f, sheet_name="Ret_01", header=None, engine="odf")

    # Find header row
    header_idx = None
    for i in range(min(15, len(df))):
        row_vals = [str(v).strip().lower() for v in df.iloc[i].values if pd.notna(v)]
        if any("enforced" in v for v in row_vals):
            header_idx = i
            break

    if header_idx is None:
        log.error("  Could not find header in Ret_01")
        return []

    headers = [str(c).strip() for c in df.iloc[header_idx].values]
    df.columns = headers
    df = df.iloc[header_idx + 1:].reset_index(drop=True)

    # Find relevant columns
    year_col = headers[0]
    enforced_col = None
    voluntary_col = None
    port_col = None

    for c in headers:
        cl = c.lower()
        if "enforced" in cl and "total" in cl:
            enforced_col = c
        elif "voluntary" in cl and "total" in cl:
            voluntary_col = c
        elif "refused" in cl and "total" in cl:
            port_col = c

    results = []
    for _, row in df.iterrows():
        yr_raw = str(row.get(year_col, "")).strip()
        # Extract year from various formats
        yr_match = re.match(r'(\d{4})', yr_raw)
        if not yr_match:
            continue
        yr = int(yr_match.group(1))
        if yr < 2004 or yr > 2030:
            continue

        entry = {"year": yr}
        if enforced_col:
            entry["enforced"] = clean_val(row.get(enforced_col))
        if voluntary_col:
            entry["voluntary"] = clean_val(row.get(voluntary_col))
        if port_col:
            entry["portRefusals"] = clean_val(row.get(port_col))
        results.append(entry)

    log.info(f"  Returns: {len(results)} years")
    return results


# --- Main ---

def main():
    log.info("=== Immigration transform.py ===")

    net_migration = extract_net_migration()
    migration_by_reason = extract_migration_by_reason()
    visa_grants = extract_visa_grants()
    asylum = extract_asylum()
    small_boats = extract_small_boats()
    returns = extract_returns()

    # Get latest values for headline metrics
    # Net migration: latest from net_migration series
    net_mig_series = [r for r in net_migration if r["flow"] == "net_migration"]
    latest_net = net_mig_series[-1] if net_mig_series else {}

    # Asylum backlog: latest from asylum series
    latest_asylum = asylum[-1] if asylum else {}

    # Small boats: latest full year
    sb_latest = [s for s in small_boats if s["year"] == 2025]
    sb_latest = sb_latest[0] if sb_latest else (small_boats[-1] if small_boats else {})

    output = {
        "topic": "immigration",
        "lastUpdated": TODAY,
        "headlines": {
            "netMigration": latest_net.get("all"),
            "netMigrationPeriod": latest_net.get("period", ""),
            "asylumBacklog": latest_asylum.get("backlogPeople") or latest_asylum.get("backlogCases"),
            "asylumBacklogYear": latest_asylum.get("year"),
            "asylumGrantRate": latest_asylum.get("grantRate"),
            "smallBoats2025": sb_latest.get("migrants", 0),
            "smallBoatsTotal": sum(s["migrants"] for s in small_boats),
        },
        "netMigration": net_migration,
        "migrationByReason": migration_by_reason,
        "visaGrants": visa_grants,
        "asylum": asylum,
        "smallBoats": small_boats,
        "returns": returns,
        "metadata": {
            "sources": [
                {
                    "name": "ONS",
                    "dataset": "Long-term international migration flows, provisional",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/longterminternationalimmigrationemigrationandnetmigrationflowsprovisional",
                    "retrieved": TODAY,
                    "frequency": "Twice yearly (May, November)",
                },
                {
                    "name": "Home Office",
                    "dataset": "Asylum summary tables",
                    "url": "https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables",
                    "retrieved": TODAY,
                    "frequency": "Quarterly",
                },
                {
                    "name": "Home Office",
                    "dataset": "Entry clearance visas summary tables",
                    "url": "https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables",
                    "retrieved": TODAY,
                    "frequency": "Quarterly",
                },
                {
                    "name": "Home Office",
                    "dataset": "Small boat arrivals time series",
                    "url": "https://www.gov.uk/government/publications/migrants-detected-crossing-the-english-channel-in-small-boats",
                    "retrieved": TODAY,
                    "frequency": "Weekly",
                },
                {
                    "name": "Home Office",
                    "dataset": "Returns summary tables",
                    "url": "https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables",
                    "retrieved": TODAY,
                    "frequency": "Quarterly",
                },
            ],
            "methodology": "Net migration uses ONS LTIM provisional estimates based on administrative data. "
                          "Asylum, visa, and returns data from Home Office quarterly immigration statistics. "
                          "Small boat data is provisional operational data updated weekly. "
                          "ONS revised its methodology in 2023 — pre-2012 IPS-based estimates are not directly comparable.",
            "knownIssues": [
                "ONS LTIM methodology changed in 2023 — admin-data estimates from YE Jun 2012 onwards replace older IPS estimates",
                "Some 2025 figures are provisional [p] and may be revised",
                "Small boat daily data is operational and subject to revision",
                "Home Office statistics will move from quarterly to annual publication from August 2026",
            ],
        },
    }

    out_path = OUTPUT / "immigration.json"
    out_path.write_text(json.dumps(output, indent=2))
    size_kb = out_path.stat().st_size / 1024
    log.info(f"\nOutput: {out_path} ({size_kb:.1f} KB)")
    log.info(f"  Net migration: {len(net_migration)} rows")
    log.info(f"  Migration by reason: {len(migration_by_reason)} rows")
    log.info(f"  Visa grants: {len(visa_grants)} years")
    log.info(f"  Asylum: {len(asylum)} years")
    log.info(f"  Small boats: {len(small_boats)} years")
    log.info(f"  Returns: {len(returns)} years")
    net_val = output['headlines']['netMigration']
    backlog_val = output['headlines']['asylumBacklog']
    boats_val = output['headlines']['smallBoats2025']
    log.info(f"  Headlines: net={net_val:,}" if net_val else "  Headlines: net=N/A")
    log.info(f"  Backlog={backlog_val:,}" if backlog_val else "  Backlog=N/A")
    log.info(f"  Boats 2025={boats_val:,}" if boats_val else "  Boats 2025=N/A")


if __name__ == "__main__":
    main()
