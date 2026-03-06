import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Factory-Built Homes Fix the Housing Crisis?',
  description: 'Modular housing completions remain below 10,000 a year despite government targets, though quality outcomes are improving.',
  openGraph: {
    title: 'Can Factory-Built Homes Fix the Housing Crisis?',
    description: 'Modular housing completions remain below 10,000 a year despite government targets, though quality outcomes are improving.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/modular-housing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Factory-Built Homes Fix the Housing Crisis?',
    description: 'Modular housing completions remain below 10,000 a year despite government targets, though quality outcomes are improving.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/modular-housing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
