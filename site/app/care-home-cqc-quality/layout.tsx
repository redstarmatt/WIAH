import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Care Homes Safe?',
  description: '3.7% of care homes are rated Inadequate by the CQC — and a further 25% Require Improvement, meaning nearly 1 in 3 homes is not meeting the standard.',
  openGraph: {
    title: 'Are Care Homes Safe?',
    description: '3.7% of care homes are rated Inadequate by the CQC — and a further 25% Require Improvement, meaning nearly 1 in 3 homes is not meeting the standard.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-home-cqc-quality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Care Homes Safe?',
    description: '3.7% of care homes are rated Inadequate by the CQC — and a further 25% Require Improvement, meaning nearly 1 in 3 homes is not meeting the standard.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-home-cqc-quality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
