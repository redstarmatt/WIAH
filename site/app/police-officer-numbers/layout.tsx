import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are There Enough Police Officers?',
  description: 'England and Wales reached 147,000 officers in 2024 — but this still leaves a 4,000 shortfall versus 2010 levels, with less experience and more complex demand.',
  openGraph: {
    title: 'Are There Enough Police Officers?',
    description: 'England and Wales reached 147,000 officers in 2024 — but this still leaves a 4,000 shortfall versus 2010 levels, with less experience and more complex demand.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/police-officer-numbers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are There Enough Police Officers?',
    description: 'England and Wales reached 147,000 officers in 2024 — but this still leaves a 4,000 shortfall versus 2010 levels, with less experience and more complex demand.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/police-officer-numbers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
