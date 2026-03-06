/**
 * Generates per-page layout.tsx files with SEO metadata
 * extracted from each page's <TopicHeader> props.
 *
 * Run from repo root: node scripts/generate-page-metadata.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, '..', 'site', 'app');
const BASE_URL = 'https://whatisactuallyhappening.uk';

// Pages that already have hand-crafted metadata or should be skipped
const SKIP_DIRS = new Set(['about']);

// Extract a string prop value from JSX like topic="Foo Bar"
function extractProp(src, propName) {
  // Matches: propName="value" or propName={'value'} across newlines
  const re = new RegExp(`${propName}=\\{?"([^"]+)"\\}?|${propName}=\\{'([^']+)'\\}?`, 'i');
  const m = src.match(re);
  if (m) return (m[1] || m[2]).trim();

  // Template literal or curly-brace string
  const re2 = new RegExp(`${propName}=\\{\`([^\`]+)\`\\}`, 'i');
  const m2 = src.match(re2);
  if (m2) return m2[1].trim();

  return null;
}

// Extract the TopicHeader block from page source
function extractTopicHeaderBlock(src) {
  const start = src.indexOf('<TopicHeader');
  if (start === -1) return null;
  // Find closing /> or > ... </TopicHeader>
  const end = src.indexOf('/>', start);
  if (end === -1) return null;
  return src.slice(start, end + 2);
}

// Slugify: turn kebab-case into Title Case for fallback
function slugToTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Escape characters that might break template literals
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function generateLayout(slug, question, description) {
  const title = esc(question);
  const desc = esc(description);
  const canonical = `${BASE_URL}/${slug}`;

  return `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title}',
  description: '${desc}',
  openGraph: {
    title: '${title}',
    description: '${desc}',
    type: 'article',
    url: '${canonical}',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${desc}',
  },
  alternates: {
    canonical: '${canonical}',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
}

let created = 0;
let skipped = 0;
let fallback = 0;

const dirs = fs.readdirSync(APP_DIR, { withFileTypes: true });

for (const dir of dirs) {
  if (!dir.isDirectory()) continue;
  if (dir.name.startsWith('_') || dir.name.startsWith('(')) continue;
  if (SKIP_DIRS.has(dir.name)) { skipped++; continue; }

  const pagePath = path.join(APP_DIR, dir.name, 'page.tsx');
  const layoutPath = path.join(APP_DIR, dir.name, 'layout.tsx');

  if (!fs.existsSync(pagePath)) continue;
  // Don't overwrite hand-crafted layouts
  if (fs.existsSync(layoutPath)) { skipped++; continue; }

  const src = fs.readFileSync(pagePath, 'utf8');
  const block = extractTopicHeaderBlock(src);

  let question, description;

  if (block) {
    question = extractProp(block, 'question');
    const finding = extractProp(block, 'finding');
    description = finding;
  }

  // Fallback: derive from slug
  if (!question) {
    question = slugToTitle(dir.name);
    fallback++;
  }
  if (!description) {
    description = `UK data and statistics on ${question.toLowerCase()}. What is actually happening?`;
    fallback++;
  }

  fs.writeFileSync(layoutPath, generateLayout(dir.name, question, description), 'utf8');
  created++;
}

console.log(`Done. Created: ${created} | Skipped: ${skipped} | Used slug fallback: ${fallback}`);
