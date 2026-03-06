import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are New Mothers Getting Mental Health Support?',
  description: 'One in ten mothers experiences postnatal depression, yet specialist Mother and Baby Units are available in fewer than half of NHS regions.',
  openGraph: {
    title: 'Are New Mothers Getting Mental Health Support?',
    description: 'One in ten mothers experiences postnatal depression, yet specialist Mother and Baby Units are available in fewer than half of NHS regions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/perinatal-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are New Mothers Getting Mental Health Support?',
    description: 'One in ten mothers experiences postnatal depression, yet specialist Mother and Baby Units are available in fewer than half of NHS regions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/perinatal-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
