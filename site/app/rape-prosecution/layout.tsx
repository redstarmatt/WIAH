import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Do So Few Rape Cases Reach Court?',
  description: 'Fewer than 3&percnt; of reported rapes result in a charge. The average wait from report to trial now exceeds 1,000 days. Despite a doubling in reporting since 2015, the number of prosecutions has barely recovered from a historic collapse.',
  openGraph: {
    title: 'Why Do So Few Rape Cases Reach Court?',
    description: 'Fewer than 3&percnt; of reported rapes result in a charge. The average wait from report to trial now exceeds 1,000 days. Despite a doubling in reporting since 2015, the number of prosecutions has barely recovered from a historic collapse.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rape-prosecution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Do So Few Rape Cases Reach Court?',
    description: 'Fewer than 3&percnt; of reported rapes result in a charge. The average wait from report to trial now exceeds 1,000 days. Despite a doubling in reporting since 2015, the number of prosecutions has barely recovered from a historic collapse.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rape-prosecution',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
