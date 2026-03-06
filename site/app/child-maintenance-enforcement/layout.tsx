import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Non-Resident Parents Paying Child Support?',
  description: '975,000 child maintenance cases are managed by the Child Maintenance Service — but £394 million in arrears has accumulated, with 31% of paying parents non-compliant.',
  openGraph: {
    title: 'Are Non-Resident Parents Paying Child Support?',
    description: '975,000 child maintenance cases are managed by the Child Maintenance Service — but £394 million in arrears has accumulated, with 31% of paying parents non-compliant.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-maintenance-enforcement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Non-Resident Parents Paying Child Support?',
    description: '975,000 child maintenance cases are managed by the Child Maintenance Service — but £394 million in arrears has accumulated, with 31% of paying parents non-compliant.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-maintenance-enforcement',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
