"""
run_all.py — orchestrates all WIAH data pipelines.

Usage:
  python data/run_all.py               # run everything
  python data/run_all.py health        # run only the health pipelines
  python data/run_all.py gp-access     # run only the gp-access pipeline

Each pipeline is run in order: fetch → transform.
If fetch reports no new data (exit 0) and --force is not set, transform is skipped.
"""

import subprocess
import sys
import json
import logging
from pathlib import Path
from datetime import datetime

ROOT      = Path(__file__).resolve().parent.parent
DATA_DIR  = ROOT / "data"
LOG_FORMAT = "%(asctime)s  %(levelname)-8s  %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
log = logging.getLogger(__name__)

PYTHON = sys.executable

PIPELINES = [
    # (name, topic, pipeline_dir)
    ("gp-access",  "health", DATA_DIR / "pipelines" / "gp-access"),
    ("ambulance",  "health", DATA_DIR / "pipelines" / "ambulance"),
    ("housing",    "housing",   DATA_DIR / "pipelines" / "housing"),
    ("water",      "water",     DATA_DIR / "pipelines" / "water"),
    ("crime",      "justice",   DATA_DIR / "pipelines" / "crime"),
    ("education",  "education", DATA_DIR / "pipelines" / "education"),
    ("economy",    "economy",   DATA_DIR / "pipelines" / "economy"),
    ("immigration","immigration",DATA_DIR / "pipelines" / "immigration"),
    ("rtt-waiting","health",     DATA_DIR / "pipelines" / "rtt-waiting"),
    ("gdp",        "economy",   DATA_DIR / "pipelines" / "gdp"),
    ("crime-trends","justice",   DATA_DIR / "pipelines" / "crime-trends"),
    ("teacher-workforce","education",DATA_DIR / "pipelines" / "teacher-workforce"),
    ("cancer-survival","health",    DATA_DIR / "pipelines" / "cancer-survival"),
    ("hospital-beds",  "health",    DATA_DIR / "pipelines" / "hospital-beds"),
    ("reoffending",    "justice",   DATA_DIR / "pipelines" / "reoffending"),
    ("graduate-outcomes","education",DATA_DIR / "pipelines" / "graduate-outcomes"),
    ("water-financials","water",    DATA_DIR / "pipelines" / "water-financials"),
    ("social-housing", "housing",   DATA_DIR / "pipelines" / "social-housing"),
    ("transport",      "transport",  DATA_DIR / "pipelines" / "transport"),
    ("energy",         "energy",     DATA_DIR / "pipelines" / "energy"),
    ("social-care",    "social-care", DATA_DIR / "pipelines" / "social-care"),
]


def run(script: Path, label: str) -> bool:
    """Run a Python script. Returns True on success."""
    log.info(f"  Running {label} …")
    result = subprocess.run(
        [PYTHON, str(script)],
        cwd=str(ROOT),
        capture_output=False,
    )
    if result.returncode != 0:
        log.error(f"  FAILED: {label} (exit {result.returncode})")
        return False
    return True


def copy_to_site():
    """Copy data/output/* → site/public/data/"""
    import shutil
    src = DATA_DIR / "output"
    dst = ROOT / "site" / "public" / "data"
    dst.mkdir(parents=True, exist_ok=True)
    for topic_dir in src.iterdir():
        if not topic_dir.is_dir():
            continue
        dest_topic = dst / topic_dir.name
        dest_topic.mkdir(parents=True, exist_ok=True)
        for f in topic_dir.glob("*.json"):
            shutil.copy2(f, dest_topic / f.name)
            log.info(f"  copied: {f.relative_to(ROOT)} → site/public/data/{topic_dir.name}/{f.name}")


def main():
    filter_name = sys.argv[1] if len(sys.argv) > 1 else None
    force       = "--force" in sys.argv

    pipelines = PIPELINES
    if filter_name:
        pipelines = [p for p in PIPELINES if filter_name in p[0] or filter_name in p[1]]
        if not pipelines:
            log.error(f"No pipeline matched filter: {filter_name}")
            sys.exit(1)

    results = {"started": datetime.utcnow().isoformat(), "pipelines": {}}
    any_failure = False

    for name, topic, pipeline_dir in pipelines:
        log.info(f"=== Pipeline: {name} ===")
        fetch_ok = run(pipeline_dir / "fetch.py", f"{name}/fetch")

        # Check if new data was downloaded (state file carries any_new_data flag)
        new_data = False
        if fetch_ok:
            state_file = DATA_DIR / "raw" / name / "_state.json"
            if state_file.exists():
                import json as _json
                state = _json.loads(state_file.read_text())
                key = name.replace("-", "_")
                new_data = state.get(key, {}).get("any_new_data", True)
            else:
                new_data = True  # no state file → first run, always transform

        should_transform = fetch_ok and (new_data or force)
        transform_ok = run(pipeline_dir / "transform.py", f"{name}/transform") if should_transform else True

        results["pipelines"][name] = {
            "fetch":     "ok" if fetch_ok else "failed",
            "transform": "ok" if transform_ok else ("skipped" if not should_transform else "failed"),
            "new_data":  new_data,
        }
        if not fetch_ok or not transform_ok:
            any_failure = True

    log.info("=== Copying output to site ===")
    copy_to_site()

    results["finished"] = datetime.utcnow().isoformat()
    (DATA_DIR / "_run_results.json").write_text(json.dumps(results, indent=2))
    log.info(json.dumps(results, indent=2))

    if any_failure:
        log.error("One or more pipelines failed. Check logs above.")
        sys.exit(1)
    else:
        log.info("✓ All pipelines completed successfully.")


if __name__ == "__main__":
    main()
