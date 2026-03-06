import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many homes have been turned into Airbnbs?',
  description: '257,000 properties in England are listed as short-term lets &mdash; a near-fourfold increase since 2015. In Cornwall, 36% of housing stock is let short-term. Teachers, nurses and local workers are being priced out of the communities they serve.',
  openGraph: {
    title: 'How many homes have been turned into Airbnbs?',
    description: '257,000 properties in England are listed as short-term lets &mdash; a near-fourfold increase since 2015. In Cornwall, 36% of housing stock is let short-term. Teachers, nurses and local workers are being priced out of the communities they serve.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/holiday-lets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many homes have been turned into Airbnbs?',
    description: '257,000 properties in England are listed as short-term lets &mdash; a near-fourfold increase since 2015. In Cornwall, 36% of housing stock is let short-term. Teachers, nurses and local workers are being priced out of the communities they serve.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/holiday-lets',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
