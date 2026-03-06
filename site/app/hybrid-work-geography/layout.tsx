import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Gets to Work From Home?',
  description: '28% of UK workers work from home at least partly &mdash; but this drops to 4% in manual occupations, creating a two-tier labour market by geography and class.',
  openGraph: {
    title: 'Who Gets to Work From Home?',
    description: '28% of UK workers work from home at least partly &mdash; but this drops to 4% in manual occupations, creating a two-tier labour market by geography and class.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hybrid-work-geography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Gets to Work From Home?',
    description: '28% of UK workers work from home at least partly &mdash; but this drops to 4% in manual occupations, creating a two-tier labour market by geography and class.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hybrid-work-geography',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
