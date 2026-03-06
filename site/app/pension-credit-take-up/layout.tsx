import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Missing Out on Pension Credit?',
  description: 'Around 800,000 eligible pensioners do not claim Pension Credit — worth up to £3,900 per year — leaving £1.5 billion unclaimed annually.',
  openGraph: {
    title: 'Who Is Missing Out on Pension Credit?',
    description: 'Around 800,000 eligible pensioners do not claim Pension Credit — worth up to £3,900 per year — leaving £1.5 billion unclaimed annually.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pension-credit-take-up',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Missing Out on Pension Credit?',
    description: 'Around 800,000 eligible pensioners do not claim Pension Credit — worth up to £3,900 per year — leaving £1.5 billion unclaimed annually.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pension-credit-take-up',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
