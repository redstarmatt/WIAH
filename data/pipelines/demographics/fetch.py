#!/usr/bin/env python3
"""Fetch ONS births summary data for UK demographic trends."""

import hashlib, requests
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent.parent
RAW = ROOT / 'data' / 'raw' / 'demographics'
RAW.mkdir(parents=True, exist_ok=True)

BIRTHS_URL = 'https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables/2022/birthssummary2022refreshedpopulations.xlsx'

def fetch_file(url, dest):
    dest = RAW / dest
    r = requests.get(url, timeout=60, headers={'User-Agent': 'WIAH/1.0'})
    r.raise_for_status()
    new_md5 = hashlib.md5(r.content).hexdigest()
    if dest.exists():
        existing_md5 = hashlib.md5(dest.read_bytes()).hexdigest()
        if existing_md5 == new_md5:
            print(f'  SKIP (unchanged): {dest.name}')
            return
    dest.write_bytes(r.content)
    print(f'  SAVED: {dest.name} ({len(r.content)//1024}KB)')

if __name__ == '__main__':
    print('Fetching demographics (births) data...')
    fetch_file(BIRTHS_URL, 'births_summary.xlsx')
    print(f'  RAW dir: {RAW}')
    print('Done.')
