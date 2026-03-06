import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Time Are NHS Staff Losing to Sickness?',
  description: 'NHS staff absence hit 5.6% in 2022/23 — the equivalent of 75,000 full-time staff off sick every day, costing over £3.3 billion annually and compounding existing workforce shortages.',
  openGraph: {
    title: 'How Much Time Are NHS Staff Losing to Sickness?',
    description: 'NHS staff absence hit 5.6% in 2022/23 — the equivalent of 75,000 full-time staff off sick every day, costing over £3.3 billion annually and compounding existing workforce shortages.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-sickness-absence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Time Are NHS Staff Losing to Sickness?',
    description: 'NHS staff absence hit 5.6% in 2022/23 — the equivalent of 75,000 full-time staff off sick every day, costing over £3.3 billion annually and compounding existing workforce shortages.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-sickness-absence',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
