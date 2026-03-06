import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Green Economy Actually Creating Jobs?',
  description: 'The low-carbon economy employs 763,000 people in the UK — up from 430,000 in 2014 — and pays a wage premium of around 8&percnt; above comparable non-green roles. But green jobs are highly concentrated in the South East, with just 12&percnt; located in the most deprived communities, raising serious questions about who benefits from the transition.',
  openGraph: {
    title: 'Is the Green Economy Actually Creating Jobs?',
    description: 'The low-carbon economy employs 763,000 people in the UK — up from 430,000 in 2014 — and pays a wage premium of around 8&percnt; above comparable non-green roles. But green jobs are highly concentrated in the South East, with just 12&percnt; located in the most deprived communities, raising serious questions about who benefits from the transition.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/green-jobs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Green Economy Actually Creating Jobs?',
    description: 'The low-carbon economy employs 763,000 people in the UK — up from 430,000 in 2014 — and pays a wage premium of around 8&percnt; above comparable non-green roles. But green jobs are highly concentrated in the South East, with just 12&percnt; located in the most deprived communities, raising serious questions about who benefits from the transition.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/green-jobs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
