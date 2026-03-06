import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why has the UK economy barely grown since 2008?',
  description: 'UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. Labour productivity is 20% below Germany. 2023 saw just 0.1% growth. The UK has underperformed its economic potential for 15 years.',
  openGraph: {
    title: 'Why has the UK economy barely grown since 2008?',
    description: 'UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. Labour productivity is 20% below Germany. 2023 saw just 0.1% growth. The UK has underperformed its economic potential for 15 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/economic-growth',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why has the UK economy barely grown since 2008?',
    description: 'UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. Labour productivity is 20% below Germany. 2023 saw just 0.1% growth. The UK has underperformed its economic potential for 15 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/economic-growth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
