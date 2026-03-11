import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is the Public Sector Getting More Efficient?`,
  description: 'Public sector productivity remains 6% below pre-pandemic levels. The NHS (down 10% vs 2019) is the biggest drag, reflecting workforce exhaustion and high absence rates after Covid.',
  openGraph: {
    title: `Is the Public Sector Getting More Efficient?`,
    description: 'Public sector productivity remains 6% below pre-pandemic levels. The NHS (down 10% vs 2019) is the biggest drag, reflecting workforce exhaustion and high absence rates after Covid.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-sector-productivity',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is the Public Sector Getting More Efficient?`,
    description: 'Public sector productivity remains 6% below pre-pandemic levels. The NHS (down 10% vs 2019) is the biggest drag, reflecting workforce exhaustion and high absence rates after Covid.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-sector-productivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
