import { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://www.wiah.uk';

function getTopicSlugs(): string[] {
  const appDir = join(process.cwd(), 'app');
  try {
    return readdirSync(appDir).filter((name) => {
      const full = join(appDir, name);
      return (
        statSync(full).isDirectory() &&
        !name.startsWith('_') &&
        !name.startsWith('(') &&
        name !== 'api'
      );
    });
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getTopicSlugs();

  const topicRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: slug === 'about' ? 0.5 : 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...topicRoutes,
  ];
}
