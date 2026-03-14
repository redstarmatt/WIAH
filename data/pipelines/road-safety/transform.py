"""
Road Safety — transform.py

Reads downloaded STATS19 ODS tables and outputs two JSON files:
  data/output/road-casualties/road_casualties.json  → used by /road-casualties page
  data/output/road-safety/road_safety.json          → used by /road-safety page

STATS19 table structure (DfT annual report):
  RAS10001 — Total reported casualties by severity, year-by-year
              Columns: Year | Fatal | Killed or seriously injured | All severities
  RAS20001 — Casualties by road user type and severity
              Rows: road user types (Pedestrian, Cyclist, Motorcycle, Car, etc.)
              Columns: Fatal | KSI | All (per year or as a single year block)
  RAS51001 — Casualties by police force area / region, severity
"""

import json
import logging
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd

# ── Config ────────────────────────────────────────────────────────────────────

ROOT       = Path(__file__).resolve().parents[3]
RAW_DIR    = ROOT / "data" / "raw" / "road-safety"
OUT_RC     = ROOT / "data" / "output" / "road-casualties"
OUT_RS     = ROOT / "data" / "output" / "road-safety"
STATE_FILE = RAW_DIR / "_state.json"
LOG_FORMAT = "%(asctime)s  %(levelname)s  %(message)s"

logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

OUT_RC.mkdir(parents=True, exist_ok=True)
OUT_RS.mkdir(parents=True, exist_ok=True)


# ── Helpers ───────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {}


def latest_release_dir() -> Path:
    """Return the most recently downloaded release directory."""
    state = load_state()
    release = state.get("road_safety", {}).get("release")
    if release:
        d = RAW_DIR / release
        if d.exists():
            return d
    # Fallback: most recently modified subdirectory
    dirs = sorted(
        [d for d in RAW_DIR.iterdir() if d.is_dir() and not d.name.startswith("_")],
        key=lambda d: d.stat().st_mtime,
        reverse=True,
    )
    if not dirs:
        raise RuntimeError(f"No release directories found in {RAW_DIR}. Run fetch.py first.")
    return dirs[0]


def find_table(release_dir: Path, table_name: str) -> Path | None:
    """Find the ODS/XLSX file for a given table name (case-insensitive)."""
    for ext in ("ods", "xlsx", "xls"):
        p = release_dir / f"{table_name}.{ext}"
        if p.exists():
            return p
    # Glob fallback
    matches = list(release_dir.glob(f"{table_name}.*"))
    return matches[0] if matches else None


def read_ods(path: Path, sheet: int | str = 0) -> pd.DataFrame:
    """Read an ODS or Excel file into a DataFrame."""
    suffix = path.suffix.lower()
    if suffix == ".ods":
        return pd.read_excel(path, sheet_name=sheet, engine="odf", header=None)
    else:
        return pd.read_excel(path, sheet_name=sheet, engine="openpyxl", header=None)


def to_int(val) -> int | None:
    """Coerce a cell value to int, returning None if not possible."""
    try:
        return int(str(val).replace(",", "").strip())
    except (ValueError, TypeError):
        return None


def to_float(val) -> float | None:
    try:
        return round(float(str(val).replace(",", "").strip()), 1)
    except (ValueError, TypeError):
        return None


# ── RAS10001 parser ───────────────────────────────────────────────────────────
# RAS10001: Reported casualties by severity
# The DfT ODS typically has:
#   Several header rows, then data rows where col[0] = year (4-digit int)
#   Col 1 = Fatal, Col 2+ = KSI / All severities
# We look for rows where the first column is a plausible year (1970–2030).

def parse_ras10001(path: Path) -> dict:
    """
    Returns {
      "fatal":   [{year, count}],   -- killed
      "ksi":     [{year, count}],   -- killed or seriously injured
      "serious": [{year, count}],   -- seriously injured (derived: ksi - fatal)
      "all":     [{year, count}],   -- all severities
    }
    """
    log.info("Parsing RAS10001: %s", path.name)

    # Try each sheet until we find data rows with year values
    try:
        sheet_names = pd.ExcelFile(path, engine="odf" if path.suffix == ".ods" else "openpyxl").sheet_names
    except Exception:
        sheet_names = [0]

    raw = None
    for sheet in sheet_names:
        try:
            df = read_ods(path, sheet=sheet)
            # Check if any cell in col 0 looks like a year
            years_found = df.iloc[:, 0].apply(lambda v: str(v).strip().isdigit() and 1970 <= int(str(v).strip()) <= 2030)
            if years_found.any():
                raw = df
                log.info("  Using sheet: %s", sheet)
                break
        except Exception:
            continue

    if raw is None:
        raise RuntimeError(f"Could not find year data in {path}")

    records = {"fatal": [], "ksi": [], "serious": [], "all": []}

    for _, row in raw.iterrows():
        year_val = to_int(row.iloc[0])
        if year_val is None or not (1970 <= year_val <= 2030):
            continue

        # Find numeric columns (skip the year column)
        nums = []
        for cell in row.iloc[1:]:
            v = to_int(cell)
            if v is not None and v > 0:
                nums.append(v)

        if len(nums) < 2:
            continue

        # DfT column order: Fatal | KSI | Slight | All
        # (sometimes: Fatal | Serious | Slight | All — derive KSI)
        fatal = nums[0]

        if len(nums) >= 4:
            # Has separate serious column: Fatal | Serious | Slight | All (or KSI variant)
            # Heuristic: if nums[1] > nums[0] * 5 → it's KSI, else it's Serious
            if nums[1] > fatal * 3:
                ksi = nums[1]
                all_sev = nums[-1]
            else:
                serious = nums[1]
                ksi = fatal + serious
                all_sev = nums[-1]
            serious = ksi - fatal
        elif len(nums) == 3:
            # Fatal | KSI | All
            ksi = nums[1]
            serious = ksi - fatal
            all_sev = nums[2]
        else:
            # Fatal | All only
            ksi = None
            serious = None
            all_sev = nums[1]

        records["fatal"].append({"year": year_val, "count": fatal})
        if ksi is not None:
            records["ksi"].append({"year": year_val, "count": ksi})
        if serious is not None:
            records["serious"].append({"year": year_val, "count": serious})
        if all_sev is not None:
            records["all"].append({"year": year_val, "count": all_sev})

    log.info(
        "  RAS10001: %d years of fatality data (%d–%d)",
        len(records["fatal"]),
        records["fatal"][0]["year"] if records["fatal"] else 0,
        records["fatal"][-1]["year"] if records["fatal"] else 0,
    )
    return records


# ── RAS20001 parser ───────────────────────────────────────────────────────────
# RAS20001: Casualties by road user type
# Structure varies by year, but broadly:
#   Rows = road user categories (Pedestrian, Pedal cyclist, Motorcycle, Car, etc.)
#   Columns = Fatal | KSI | All (often for the latest year in each row)
# We look for keyword rows.

ROAD_USER_KEYWORDS = {
    "pedestrian": "pedestrian",
    "pedal cycle": "cyclist",
    "cyclist":     "cyclist",
    "motorcycle":  "motorcyclist",
    "motor cycle": "motorcyclist",
    "car":         "car",
    "van":         "van",
    "bus":         "bus",
    "hgv":         "hgv",
    "other":       "other",
}

def parse_ras20001(path: Path) -> list[dict]:
    """
    Returns [{type, fatal, ksi, all}] for the most recent year in the table.
    """
    log.info("Parsing RAS20001: %s", path.name)

    try:
        sheet_names = pd.ExcelFile(path, engine="odf" if path.suffix == ".ods" else "openpyxl").sheet_names
    except Exception:
        sheet_names = [0]

    raw = None
    for sheet in sheet_names:
        try:
            df = read_ods(path, sheet=sheet)
            # Look for a cell containing "pedestrian" (case-insensitive)
            mask = df.apply(lambda col: col.astype(str).str.lower().str.contains("pedestrian"))
            if mask.any().any():
                raw = df
                log.info("  Using sheet: %s (found 'pedestrian')", sheet)
                break
        except Exception:
            continue

    if raw is None:
        log.warning("  RAS20001: could not find road user data, skipping.")
        return []

    results = []
    seen = set()

    for _, row in raw.iterrows():
        label = str(row.iloc[0]).lower().strip()
        matched_type = None
        for keyword, user_type in ROAD_USER_KEYWORDS.items():
            if keyword in label:
                matched_type = user_type
                break

        if matched_type is None or matched_type in seen:
            continue

        nums = []
        for cell in row.iloc[1:]:
            v = to_int(cell)
            if v is not None and v >= 0:
                nums.append(v)

        if len(nums) < 2:
            continue

        seen.add(matched_type)
        results.append({
            "type": matched_type,
            "fatal": nums[0],
            "ksi": nums[1] if len(nums) > 1 else None,
            "all": nums[-1],
        })

    log.info("  RAS20001: %d road user types found", len(results))
    return results


# ── RAS51001 parser ───────────────────────────────────────────────────────────
# RAS51001: Casualties by police force area / region
# We want deaths per region for the most recent year.

REGION_MAP = {
    "metropolitan": "London",
    "london":       "London",
    "north east":   "North East",
    "north west":   "North West",
    "yorkshire":    "Yorkshire & Humber",
    "east midlands":"East Midlands",
    "west midlands":"West Midlands",
    "east of england": "East of England",
    "eastern":      "East of England",
    "south east":   "South East",
    "south west":   "South West",
    "wales":        "Wales",
    "scotland":     "Scotland",
}

def parse_ras51001(path: Path) -> list[dict]:
    """
    Returns [{region, fatal, ksi}] for the most recent year in the table.
    """
    log.info("Parsing RAS51001: %s", path.name)

    try:
        sheet_names = pd.ExcelFile(path, engine="odf" if path.suffix == ".ods" else "openpyxl").sheet_names
    except Exception:
        sheet_names = [0]

    raw = None
    for sheet in sheet_names:
        try:
            df = read_ods(path, sheet=sheet)
            mask = df.apply(lambda col: col.astype(str).str.lower().str.contains("metropolitan|north west|yorkshire|south east|wales|scotland"))
            if mask.any().any():
                raw = df
                log.info("  Using sheet: %s", sheet)
                break
        except Exception:
            continue

    if raw is None:
        log.warning("  RAS51001: could not find regional data, skipping.")
        return []

    results = {}

    for _, row in raw.iterrows():
        label = str(row.iloc[0]).lower().strip()
        matched_region = None
        for keyword, region_name in REGION_MAP.items():
            if keyword in label:
                matched_region = region_name
                break

        if matched_region is None:
            continue

        nums = []
        for cell in row.iloc[1:]:
            v = to_int(cell)
            if v is not None and v > 0:
                nums.append(v)

        if not nums:
            continue

        if matched_region not in results:
            results[matched_region] = {"fatal": nums[0], "ksi": nums[1] if len(nums) > 1 else nums[0]}

    log.info("  RAS51001: %d regions found", len(results))
    return [{"region": k, **v} for k, v in results.items()]


# ── ONS population estimates for per-100k rates ───────────────────────────────
# Mid-2023 ONS estimates (millions) — updated annually from ONS website
REGION_POPULATION = {
    "London":            8.8,
    "North East":        2.7,
    "North West":        7.4,
    "Yorkshire & Humber":5.5,
    "East Midlands":     4.9,
    "West Midlands":     5.9,
    "East of England":   6.4,
    "South East":        9.2,
    "South West":        5.7,
    "Wales":             3.2,
    "Scotland":          5.5,
}


# ── Output builders ───────────────────────────────────────────────────────────

def build_road_casualties_json(ras10001: dict, ras20001: list, ras51001: list) -> dict:
    """
    Schema for /road-casualties page:
    {
      roadDeaths, seriousInjuries, pedestrianDeaths, cyclistDeaths, byRegion
    }
    """
    road_deaths = [{"year": r["year"], "deaths": r["count"]} for r in ras10001.get("fatal", [])]
    serious_injuries = [{"year": r["year"], "injuries": r["count"]} for r in ras10001.get("serious", [])]

    # Pedestrian and cyclist deaths from RAS20001 — these are single-year snapshots
    # We still keep the time series from the hardcoded fallback if RAS20001 only gives latest year
    pedestrian_deaths = []
    cyclist_deaths = []
    for entry in ras20001:
        if entry["type"] == "pedestrian" and entry["fatal"]:
            pedestrian_deaths = [{"year": road_deaths[-1]["year"] if road_deaths else 2023, "deaths": entry["fatal"]}]
        if entry["type"] == "cyclist" and entry["fatal"]:
            cyclist_deaths = [{"year": road_deaths[-1]["year"] if road_deaths else 2023, "deaths": entry["fatal"]}]

    # Regional: deaths per 100k using ONS population estimates
    by_region = []
    for r in ras51001:
        pop = REGION_POPULATION.get(r["region"])
        if pop and r.get("fatal"):
            rate = round(r["fatal"] / (pop * 1e6) * 100_000, 1)
            by_region.append({"region": r["region"], "deathsPer100k": rate})

    by_region.sort(key=lambda x: x["deathsPer100k"], reverse=True)

    latest_year = road_deaths[-1]["year"] if road_deaths else 2023

    return {
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "latestYear": latest_year,
        "roadDeaths": road_deaths,
        "seriousInjuries": serious_injuries,
        "pedestrianDeaths": pedestrian_deaths,
        "cyclistDeaths": cyclist_deaths,
        "byRegion": by_region,
        "metadata": {
            "sources": [
                {
                    "name": "Department for Transport",
                    "dataset": "Reported Road Casualties Great Britain (STATS19)",
                    "url": "https://www.gov.uk/government/collections/road-accidents-and-safety-statistics",
                    "frequency": "annual",
                }
            ],
            "methodology": (
                "Fatal casualties = killed within 30 days. Serious injuries from 2016 onwards "
                "are affected by the transition to CRASH recording; the adjusted series is used "
                "where available. Regional rates calculated using ONS mid-year population estimates."
            ),
            "knownIssues": [
                "Serious injury counts from 2016 not directly comparable with earlier years "
                "due to CRASH reclassification of slight-to-serious injuries.",
                "2020 figures reflect reduced traffic during COVID-19 lockdowns.",
            ],
        },
    }


def build_road_safety_json(ras10001: dict, ras20001: list) -> dict:
    """
    Schema for /road-safety page — longer historical series + by-road-user breakdown.
    """
    road_deaths = [{"year": r["year"], "deaths": r["count"]} for r in ras10001.get("fatal", [])]
    serious_injuries = [{"year": r["year"], "count": r["count"]} for r in ras10001.get("serious", [])]

    by_road_user = [
        {
            "type": e["type"].capitalize(),
            "pct": round(e["all"] / sum(x["all"] for x in ras20001) * 100)
            if ras20001 and e.get("all") else None,
        }
        for e in ras20001
        if e.get("all")
    ]

    return {
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "roadDeaths": road_deaths,
        "seriousInjuries": serious_injuries,
        "byRoadUser": by_road_user,
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    try:
        release_dir = latest_release_dir()
        log.info("Processing release: %s", release_dir.name)

        # RAS10001 — casualties by severity (core time series)
        p10 = find_table(release_dir, "ras10001")
        if not p10:
            raise RuntimeError("ras10001 not found. Run fetch.py first.")
        ras10001 = parse_ras10001(p10)

        if not ras10001.get("fatal"):
            raise RuntimeError("RAS10001 parsed no fatality data — check table structure.")

        # RAS20001 — by road user type (optional, degrades gracefully)
        p20 = find_table(release_dir, "ras20001")
        ras20001 = parse_ras20001(p20) if p20 else []
        if not p20:
            log.warning("ras20001 not found — road user breakdown will be empty.")

        # RAS51001 — by region (optional, degrades gracefully)
        p51 = find_table(release_dir, "ras51001")
        ras51001 = parse_ras51001(p51) if p51 else []
        if not p51:
            log.warning("ras51001 not found — regional breakdown will be empty.")

        # Build and write outputs
        rc_json = build_road_casualties_json(ras10001, ras20001, ras51001)
        rs_json = build_road_safety_json(ras10001, ras20001)

        rc_path = OUT_RC / "road_casualties.json"
        rs_path = OUT_RS / "road_safety.json"

        rc_path.write_text(json.dumps(rc_json, indent=2))
        rs_path.write_text(json.dumps(rs_json, indent=2))

        log.info(
            "Wrote %s (%d years of fatality data)",
            rc_path.relative_to(ROOT),
            len(rc_json["roadDeaths"]),
        )
        log.info("Wrote %s", rs_path.relative_to(ROOT))

    except Exception as e:
        log.error("TRANSFORM FAILED: %s", e)
        sys.exit(1)


if __name__ == "__main__":
    main()
