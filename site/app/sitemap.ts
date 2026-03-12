import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://whatisactuallyhappening.uk';

// Directories that are Next.js internals, not public routes
const SKIP_DIRS = new Set(['api', 'fonts', '_next', '(auth)', '(main)']);

/**
 * Reads the most recent `lastUpdated` date from any JSON file in
 * public/data/{topic}/, falling back to the current build time.
 */
function getTopicLastModified(topicSlug: string): Date {
  const dataDir = path.join(process.cwd(), 'public', 'data', topicSlug);
  try {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    let latest: Date | null = null;
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(dataDir, file), 'utf8');
        const json = JSON.parse(raw);
        if (json.lastUpdated) {
          const d = new Date(json.lastUpdated);
          if (!isNaN(d.getTime()) && (!latest || d > latest)) {
            latest = d;
          }
        }
      } catch {
        // skip unreadable files
      }
    }
    if (latest) return latest;
  } catch {
    // data dir doesn't exist for this topic
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'app');

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const dirs = fs.readdirSync(appDir, { withFileTypes: true });

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    if (dir.name.startsWith('_') || dir.name.startsWith('(')) continue;
    if (SKIP_DIRS.has(dir.name)) continue;

    const pagePath = path.join(appDir, dir.name, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    const isMainTopic = ['health', 'housing', 'water', 'justice', 'education'].includes(dir.name);
    const isAbout = dir.name === 'about';

    entries.push({
      url: `${BASE_URL}/${dir.name}`,
      lastModified: getTopicLastModified(dir.name),
      changeFrequency: isMainTopic ? 'weekly' : 'monthly',
      priority: isMainTopic ? 0.9 : isAbout ? 0.8 : 0.6,
    });
  }

  return entries;
}
