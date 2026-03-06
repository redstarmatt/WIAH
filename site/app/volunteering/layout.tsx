import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Still Willing to Give Its Time?',
  description: 'Formal volunteering has fallen by a quarter since 2015, from 27&percnt; of adults volunteering monthly to just 20&percnt; in 2023. The pandemic accelerated a pre-existing decline, and the charity sector is under growing financial pressure: real-terms income has stagnated while demand for services has surged.',
  openGraph: {
    title: 'Is Britain Still Willing to Give Its Time?',
    description: 'Formal volunteering has fallen by a quarter since 2015, from 27&percnt; of adults volunteering monthly to just 20&percnt; in 2023. The pandemic accelerated a pre-existing decline, and the charity sector is under growing financial pressure: real-terms income has stagnated while demand for services has surged.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/volunteering',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Still Willing to Give Its Time?',
    description: 'Formal volunteering has fallen by a quarter since 2015, from 27&percnt; of adults volunteering monthly to just 20&percnt; in 2023. The pandemic accelerated a pre-existing decline, and the charity sector is under growing financial pressure: real-terms income has stagnated while demand for services has surged.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/volunteering',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
