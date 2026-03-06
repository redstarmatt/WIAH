#!/usr/bin/env python3
"""
Wire MetricCard href props to chart sections across all topic pages.

For each page:
1. Extract SectionNav section IDs
2. Identify chart sections (exclude sec-metrics, sec-context, sec-sources)
3. Replace onExpand={() => {}} with href="#sec-xxx" in order
"""

import re
import os
import glob

APP_DIR = os.path.join(os.path.dirname(__file__), '..', 'site', 'app')

# Section IDs that are NOT chart sections
NON_CHART_SECTIONS = {'sec-metrics', 'sec-context', 'sec-sources'}


def extract_chart_sections(content: str) -> list[str]:
    """Extract section IDs from SectionNav, filtering out non-chart sections.

    Only matches IDs that start with 'sec-' to avoid matching series/data ids.
    """
    # Match only: { id: 'sec-something', ... }  (sec- prefix required)
    ids = re.findall(r"\{\s*id:\s*'(sec-[^']+)'", content)
    # Deduplicate while preserving order
    seen = set()
    unique_ids = []
    for s in ids:
        if s not in seen:
            seen.add(s)
            unique_ids.append(s)
    chart_sections = [s for s in unique_ids if s not in NON_CHART_SECTIONS]
    return chart_sections


def replace_onexpand_with_href(content: str, chart_sections: list[str]) -> tuple[str, int]:
    """
    Replace each onExpand={() => {}} in MetricCard with href="#sec-xxx".
    Maps them in order to the chart sections.
    Returns (new_content, replacement_count).
    """
    if not chart_sections:
        return content, 0

    count = [0]
    replacements = [0]

    def replace_match(m):
        idx = count[0]
        count[0] += 1
        # Map to chart section: if more cards than sections, use the last section
        section = chart_sections[min(idx, len(chart_sections) - 1)]
        replacements[0] += 1
        return f'href="#{section}"'

    # Match onExpand={...} where the value may contain one level of nested braces
    # e.g. onExpand={() => {}}  or  onExpand={() => scrollTo('x')}
    new_content = re.sub(
        r'onExpand=\{(?:[^{}]|\{[^}]*\})*\}\s*',
        replace_match,
        content,
    )
    return new_content, replacements[0]


def remove_onexpand(content: str) -> tuple[str, int]:
    """Remove onExpand={() => {}} props entirely (for pages with no chart sections)."""
    count = [0]

    def replace_match(m):
        count[0] += 1
        return ''

    new_content = re.sub(
        r'\s*onExpand=\{(?:[^{}]|\{[^}]*\})*\}',
        replace_match,
        content,
    )
    return new_content, count[0]


def process_file(filepath: str) -> bool:
    """Process a single page file. Returns True if modified."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip files that don't have onExpand
    if 'onExpand={' not in content:
        return False

    chart_sections = extract_chart_sections(content)

    if not chart_sections:
        # No chart sections — remove the dead onExpand props
        new_content, count = remove_onexpand(content)
    else:
        new_content, count = replace_onexpand_with_href(content, chart_sections)

    if new_content == content or count == 0:
        return False

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


def main():
    pages = glob.glob(os.path.join(APP_DIR, '*/page.tsx'))
    modified = 0
    skipped = 0

    for page in sorted(pages):
        if process_file(page):
            modified += 1
        else:
            skipped += 1

    print(f"Done. Modified: {modified}, Skipped: {skipped}")


if __name__ == '__main__':
    main()
