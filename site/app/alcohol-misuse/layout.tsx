import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much is alcohol actually killing us?',
  description: 'Alcohol-specific deaths in the UK reached a record 9,641 in 2021 and hospital admissions have risen to over 900,000 a year, costing the NHS £3.5 billion — yet alcohol duty has fallen in real terms for a decade.',
  openGraph: {
    title: 'How much is alcohol actually killing us?',
    description: 'Alcohol-specific deaths in the UK reached a record 9,641 in 2021 and hospital admissions have risen to over 900,000 a year, costing the NHS £3.5 billion — yet alcohol duty has fallen in real terms for a decade.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/alcohol-misuse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much is alcohol actually killing us?',
    description: 'Alcohol-specific deaths in the UK reached a record 9,641 in 2021 and hospital admissions have risen to over 900,000 a year, costing the NHS £3.5 billion — yet alcohol duty has fallen in real terms for a decade.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/alcohol-misuse',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
