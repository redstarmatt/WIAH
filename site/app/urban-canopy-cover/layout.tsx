import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Tree Cover Is There in Your City?',
  description: 'London has more tree canopy than most European capitals, but the most deprived urban areas have half the green space of wealthy neighbourhoods.',
  openGraph: {
    title: 'How Much Tree Cover Is There in Your City?',
    description: 'London has more tree canopy than most European capitals, but the most deprived urban areas have half the green space of wealthy neighbourhoods.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/urban-canopy-cover',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Tree Cover Is There in Your City?',
    description: 'London has more tree canopy than most European capitals, but the most deprived urban areas have half the green space of wealthy neighbourhoods.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/urban-canopy-cover',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
