'use client';

import { usePathname } from 'next/navigation';

const BASE_URL = 'https://whatisactuallyhappening.uk';

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function JsonLdBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    ...segments.map((seg, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: slugToLabel(seg),
      item: `${BASE_URL}/${segments.slice(0, i + 1).join('/')}`,
    })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
