import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://whatisactuallyhappening.uk';

// Directories that are Next.js internals, not public routes
const SKIP_DIRS = new Set(['api', 'fonts', '_next', '(auth)', '(main)']);

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
      lastModified: new Date(),
      changeFrequency: isMainTopic ? 'weekly' : 'monthly',
      priority: isMainTopic ? 0.9 : isAbout ? 0.8 : 0.6,
    });
  }

  return entries;
}
