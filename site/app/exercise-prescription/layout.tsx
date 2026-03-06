import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Doctors Prescribing Exercise?',
  description: 'Physical activity referrals have reached 680,000 a year and show strong evidence of benefit — yet most GPs still default to medication.',
  openGraph: {
    title: 'Are Doctors Prescribing Exercise?',
    description: 'Physical activity referrals have reached 680,000 a year and show strong evidence of benefit — yet most GPs still default to medication.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/exercise-prescription',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Doctors Prescribing Exercise?',
    description: 'Physical activity referrals have reached 680,000 a year and show strong evidence of benefit — yet most GPs still default to medication.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/exercise-prescription',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
