import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Actually Happens When You Report a Crime?',
  description: 'Fewer than 1 in 14 recorded crimes leads to a charge or summons. UK data on crime outcomes, charge rates, court backlogs, and regional variation by police force.',
  openGraph: {
    title: 'What Actually Happens When You Report a Crime?',
    description: 'Fewer than 1 in 14 recorded crimes leads to a charge or summons. UK data on crime outcomes, charge rates, court backlogs, and regional variation by police force.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/justice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Actually Happens When You Report a Crime?',
    description: 'Fewer than 1 in 14 recorded crimes leads to a charge or summons. UK data on crime outcomes, charge rates, court backlogs, and regional variation by police force.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/justice',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
