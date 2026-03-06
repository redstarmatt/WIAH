import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Shoplifting Out of Control?',
  description: 'Recorded shoplifting offences reached 469,000 in 2024, a 30% increase in a single year, with organised retail crime escalating.',
  openGraph: {
    title: 'Why Is Shoplifting Out of Control?',
    description: 'Recorded shoplifting offences reached 469,000 in 2024, a 30% increase in a single year, with organised retail crime escalating.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/shoplifting-surge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Shoplifting Out of Control?',
    description: 'Recorded shoplifting offences reached 469,000 in 2024, a 30% increase in a single year, with organised retail crime escalating.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/shoplifting-surge',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
