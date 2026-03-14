#!/usr/bin/env node
/**
 * audit-citations.mjs
 *
 * Scans all topic page.tsx files and reports citation quality issues:
 *
 *   ERROR  — blocks CI: missing URLs in editorialRefs, internal arithmetic
 *            contradictions (same % cited with two different values on one page)
 *
 *   WARN   — advisory: numbers in changeText/description without nearby <Cite,
 *            PositiveCallout descriptions with statistics but no <Cite
 *
 * Usage:
 *   node scripts/audit-citations.mjs           → human-readable report
 *   node scripts/audit-citations.mjs --json    → JSON output
 *   node scripts/audit-citations.mjs --strict  → exit 1 on any WARN too
 *
 * Exit codes:
 *   0  clean
 *   1  ERRORs found (or WARNs in --strict mode)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SITE_APP = join(__dirname, '../site/app');
const JSON_MODE = process.argv.includes('--json');
const STRICT = process.argv.includes('--strict');

// ── Helpers ──────────────────────────────────────────────────────────────────

function walkPages(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      const page = join(full, 'page.tsx');
      try {
        statSync(page);
        results.push(page);
      } catch { /* no page.tsx */ }
    }
  }
  return results;
}

/** Extract line number for a string match in source */
function lineOf(src, index) {
  return src.slice(0, index).split('\n').length;
}

// ── Check 1: editorialRefs entries missing url ────────────────────────────────

/**
 * Matches the editorialRefs array and extracts individual ref objects.
 * Looks for { num: N, name: '...', dataset: '...' } without a url: field.
 */
function checkMissingRefUrls(src, filePath) {
  const issues = [];

  // Find the editorialRefs array block
  const blockMatch = src.match(/const\s+editorialRefs[^=]*=\s*\[([^\]]*(?:\[[^\]]*\][^\]]*)*)\]/s);
  if (!blockMatch) return issues;

  const block = blockMatch[1];
  const blockStart = src.indexOf(blockMatch[0]);

  // Split into individual ref objects
  const refPattern = /\{[^}]+\}/gs;
  let m;
  while ((m = refPattern.exec(block)) !== null) {
    const refObj = m[0];
    const hasUrl = /url\s*:/.test(refObj);
    const numMatch = refObj.match(/num\s*:\s*(\d+)/);
    const nameMatch = refObj.match(/name\s*:\s*['"]([^'"]+)['"]/);
    if (!hasUrl) {
      const absIdx = blockStart + blockMatch[0].indexOf(block) + m.index;
      issues.push({
        severity: 'ERROR',
        file: relative(join(__dirname, '..'), filePath),
        line: lineOf(src, absIdx),
        rule: 'missing-ref-url',
        message: `Reference [${numMatch?.[1] ?? '?'}] "${nameMatch?.[1] ?? '?'}" has no url field — readers cannot follow this citation`,
      });
    }
  }

  return issues;
}

// ── Check 2: Numbers in changeText strings without Cite ──────────────────────

/**
 * MetricCard changeText="..." (string form only — JSX form with <Cite embedded
 * is already considered cited). Flags strings containing numbers/percentages
 * that have no corresponding <Cite nearby.
 *
 * We only flag the *string* form (changeText="..."), not the JSX form
 * (changeText={<>...<Cite .../></>}) since the JSX form can carry inline cites.
 */
function checkUncitedChangeText(src, filePath) {
  const issues = [];

  // Match changeText="..." (string, not JSX)
  const pattern = /changeText="([^"]+)"/g;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const text = m[1];
    // Does the text contain a number / percentage / multiplier?
    if (!/\d/.test(text)) continue;

    // Look for a <Cite within 300 chars after this changeText prop
    const window = src.slice(m.index, m.index + 400);
    if (!window.includes('<Cite')) {
      issues.push({
        severity: 'WARN',
        file: relative(join(__dirname, '..'), filePath),
        line: lineOf(src, m.index),
        rule: 'uncited-changetext',
        message: `changeText contains numbers but no <Cite: "${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"`,
      });
    }
  }

  return issues;
}

// ── Check 3: PositiveCallout description with numbers but no Cite ─────────────

/**
 * Flags PositiveCallout description="..." (string form) containing statistics
 * without any <Cite. JSX form (description={<>...</>}) is exempt if it
 * contains a <Cite anywhere in its body.
 */
function checkUncitedPositiveCallout(src, filePath) {
  const issues = [];

  // String-form description
  const strPattern = /description="([^"]{20,})"/g;
  let m;
  while ((m = strPattern.exec(src)) !== null) {
    const text = m[1];
    if (!/\d/.test(text)) continue;

    // Look backwards for <PositiveCallout to confirm context
    const preceding = src.slice(Math.max(0, m.index - 200), m.index);
    if (!preceding.includes('PositiveCallout')) continue;

    // Look for a <Cite within 600 chars forward
    const window = src.slice(m.index, m.index + 600);
    if (!window.includes('<Cite')) {
      issues.push({
        severity: 'WARN',
        file: relative(join(__dirname, '..'), filePath),
        line: lineOf(src, m.index),
        rule: 'uncited-callout-description',
        message: `PositiveCallout description has statistics but no <Cite: "${text.slice(0, 80)}…"`,
      });
    }
  }

  return issues;
}

// ── Check 4: TopicHeader finding with numbers but no Cite ────────────────────

function checkUncitedFinding(src, filePath) {
  const issues = [];

  // String-form finding only — JSX form can embed Cite inline
  const strPattern = /finding="([^"]{10,})"/g;
  let m;
  while ((m = strPattern.exec(src)) !== null) {
    const text = m[1];
    if (!/\d/.test(text)) continue;

    const window = src.slice(m.index, m.index + 500);
    if (!window.includes('<Cite')) {
      issues.push({
        severity: 'WARN',
        file: relative(join(__dirname, '..'), filePath),
        line: lineOf(src, m.index),
        rule: 'uncited-finding',
        message: `TopicHeader finding has statistics but no <Cite: "${text.slice(0, 80)}${text.length > 80 ? '…' : ''}"`,
      });
    }
  }

  return issues;
}

// ── Check 5: Duplicate percentage values (potential internal contradiction) ───

/**
 * Finds all numeric values assigned to MetricCard value="..." or changeText="..."
 * and checks for the same labelled metric appearing with different values.
 * This is heuristic — it flags when the same percentage word appears in two
 * different MetricCard value props on the same page with different numbers.
 */
function checkInternalContradictions(src, filePath) {
  const issues = [];

  // Extract all MetricCard label + value pairs
  const cards = [];
  const cardPattern = /<MetricCard[\s\S]*?\/>/g;
  let m;
  while ((m = cardPattern.exec(src)) !== null) {
    const block = m[0];
    const labelM = block.match(/label="([^"]+)"/);
    const valueM = block.match(/\bvalue="([^"]+)"/);
    if (labelM && valueM) {
      cards.push({
        label: labelM[1].toLowerCase(),
        value: valueM[1],
        index: m.index,
      });
    }
  }

  // Flag duplicate labels with different values
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      // Fuzzy match: same first 20 chars of label
      const a = cards[i].label.slice(0, 20);
      const b = cards[j].label.slice(0, 20);
      if (a === b && cards[i].value !== cards[j].value) {
        issues.push({
          severity: 'WARN',
          file: relative(join(__dirname, '..'), filePath),
          line: lineOf(src, cards[j].index),
          rule: 'possible-contradiction',
          message: `Two MetricCards with similar label "${cards[i].label.slice(0, 40)}" have different values: "${cards[i].value}" vs "${cards[j].value}"`,
        });
      }
    }
  }

  return issues;
}

// ── Check 6: editorialRefs defined but page has NO <Cite at all ──────────────

function checkRefsWithoutCite(src, filePath) {
  const issues = [];
  const hasRefs = /editorialRefs/.test(src);
  const hasCite = /<Cite/.test(src);
  if (hasRefs && !hasCite) {
    issues.push({
      severity: 'WARN',
      file: relative(join(__dirname, '..'), filePath),
      line: 1,
      rule: 'refs-defined-no-cite',
      message: 'editorialRefs is defined but no <Cite component is used on this page — references are unreachable',
    });
  }
  return issues;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const pages = walkPages(SITE_APP);
const allIssues = [];

for (const page of pages) {
  let src;
  try {
    src = readFileSync(page, 'utf8');
  } catch {
    continue;
  }

  allIssues.push(
    ...checkMissingRefUrls(src, page),
    ...checkUncitedChangeText(src, page),
    ...checkUncitedPositiveCallout(src, page),
    ...checkUncitedFinding(src, page),
    ...checkInternalContradictions(src, page),
    ...checkRefsWithoutCite(src, page),
  );
}

const errors = allIssues.filter(i => i.severity === 'ERROR');
const warns  = allIssues.filter(i => i.severity === 'WARN');

// ── Output ───────────────────────────────────────────────────────────────────

if (JSON_MODE) {
  console.log(JSON.stringify({ errors, warns, total: allIssues.length }, null, 2));
} else {
  const groupByFile = (issues) => {
    const map = {};
    for (const issue of issues) {
      (map[issue.file] ??= []).push(issue);
    }
    return map;
  };

  if (errors.length) {
    console.log('\n\x1b[31m── ERRORS (must fix before merge) ──────────────────────────────\x1b[0m');
    const groups = groupByFile(errors);
    for (const [file, issues] of Object.entries(groups)) {
      console.log(`\n  \x1b[1m${file}\x1b[0m`);
      for (const issue of issues) {
        console.log(`    \x1b[31m✗\x1b[0m [L${issue.line}] ${issue.rule}: ${issue.message}`);
      }
    }
  }

  if (warns.length) {
    console.log('\n\x1b[33m── WARNINGS (advisory) ─────────────────────────────────────────\x1b[0m');
    const groups = groupByFile(warns);
    for (const [file, issues] of Object.entries(groups)) {
      console.log(`\n  \x1b[1m${file}\x1b[0m`);
      for (const issue of issues) {
        console.log(`    \x1b[33m⚠\x1b[0m [L${issue.line}] ${issue.rule}: ${issue.message}`);
      }
    }
  }

  console.log(`\n\x1b[2m── Summary: ${errors.length} error(s), ${warns.length} warning(s) across ${pages.length} pages\x1b[0m`);

  if (!errors.length && !warns.length) {
    console.log('\x1b[32m✓ All citation checks passed\x1b[0m\n');
  }
}

const shouldFail = errors.length > 0 || (STRICT && warns.length > 0);
process.exit(shouldFail ? 1 : 0);
