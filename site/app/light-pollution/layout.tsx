import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Dark Are Britain's Skies?',
  description: 'Artificial sky glow increases by 2% annually, with only six designated Dark Sky areas in England.',
  openGraph: {
    title: 'How Dark Are Britain's Skies?',
    description: 'Artificial sky glow increases by 2% annually, with only six designated Dark Sky areas in England.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/light-pollution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Dark Are Britain's Skies?',
    description: 'Artificial sky glow increases by 2% annually, with only six designated Dark Sky areas in England.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/light-pollution',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
