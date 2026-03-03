#!/usr/bin/env python3
"""Fetch ONS National Life Tables (UK) for life expectancy data."""

import hashlib, requests
from pathlib import Path

# Pipelines are at data/pipelines/life-expectancy/ — parent.parent.parent = data/
# So ROOT = parent.parent.parent.parent = project root
ROOT = Path(__file__).parent.parent.parent.parent
RAW = ROOT / 'data' / 'raw' / 'life-expectancy'
RAW.mkdir(parents=True, exist_ok=True)

NLT_URL = 'https://www.ons.gov.uk/file?uri=/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/datasets/nationallifetablesunitedkingdomreferencetables/current/nltuk198020223.xlsx'

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
    print('Fetching life expectancy data...')
    fetch_file(NLT_URL, 'nltuk.xlsx')
    print(f'  RAW dir: {RAW}')
    print('Done.')
