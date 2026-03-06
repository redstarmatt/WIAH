import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Charities Filling the Gaps Left by the State?',
  description: '6,200 charities folded in 2023 as demand for services soared — while 70% of those still operating report unmet demand they cannot serve.',
  openGraph: {
    title: 'Are Charities Filling the Gaps Left by the State?',
    description: '6,200 charities folded in 2023 as demand for services soared — while 70% of those still operating report unmet demand they cannot serve.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/charity-sector-finances',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Charities Filling the Gaps Left by the State?',
    description: '6,200 charities folded in 2023 as demand for services soared — while 70% of those still operating report unmet demand they cannot serve.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/charity-sector-finances',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
