import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are pensioners poor?',
  description: 'Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line — disproportionately women, renters, and those in the oldest age groups.',
  openGraph: {
    title: 'Are pensioners poor?',
    description: 'Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line — disproportionately women, renters, and those in the oldest age groups.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pensioner-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are pensioners poor?',
    description: 'Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line — disproportionately women, renters, and those in the oldest age groups.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pensioner-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
