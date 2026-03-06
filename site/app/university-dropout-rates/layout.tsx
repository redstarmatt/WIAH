import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Students Are Dropping Out of University?',
  description: '6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures.',
  openGraph: {
    title: 'How Many Students Are Dropping Out of University?',
    description: '6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/university-dropout-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Students Are Dropping Out of University?',
    description: '6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/university-dropout-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
