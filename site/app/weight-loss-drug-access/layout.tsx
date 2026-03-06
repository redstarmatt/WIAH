import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Get Weight-Loss Drugs on the NHS?',
  description: 'Only 35,000 people receive GLP-1 weight-loss drugs on the NHS &mdash; out of 3.4 million who may be eligible under NICE criteria.',
  openGraph: {
    title: 'Can You Get Weight-Loss Drugs on the NHS?',
    description: 'Only 35,000 people receive GLP-1 weight-loss drugs on the NHS &mdash; out of 3.4 million who may be eligible under NICE criteria.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/weight-loss-drug-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Get Weight-Loss Drugs on the NHS?',
    description: 'Only 35,000 people receive GLP-1 weight-loss drugs on the NHS &mdash; out of 3.4 million who may be eligible under NICE criteria.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/weight-loss-drug-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
