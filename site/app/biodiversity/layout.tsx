import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is British Wildlife Actually Coming Back?',
  description: 'The UK biodiversity picture is more complicated than &lsquo;crisis only&rsquo;. 41% of species have declined since 1970 — but red kites went from near-extinction to 10,000 birds in three decades. Beavers, pine martens, and white-tailed eagles are returning. Wildlife can recover when conditions change.',
  openGraph: {
    title: 'Is British Wildlife Actually Coming Back?',
    description: 'The UK biodiversity picture is more complicated than &lsquo;crisis only&rsquo;. 41% of species have declined since 1970 — but red kites went from near-extinction to 10,000 birds in three decades. Beavers, pine martens, and white-tailed eagles are returning. Wildlife can recover when conditions change.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/biodiversity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is British Wildlife Actually Coming Back?',
    description: 'The UK biodiversity picture is more complicated than &lsquo;crisis only&rsquo;. 41% of species have declined since 1970 — but red kites went from near-extinction to 10,000 birds in three decades. Beavers, pine martens, and white-tailed eagles are returning. Wildlife can recover when conditions change.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/biodiversity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
