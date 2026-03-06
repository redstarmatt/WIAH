import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Disabled People Are Being Left Out of Work?',
  description: 'The disability employment gap stands at 28.4 percentage points — 53.7% of disabled people are in work, vs 82.1% of non-disabled people. 2.5 million people are out of work due to long-term sickness. PIP assessments are being overhauled as the benefits bill reaches £64 billion. Disabled people are twice as likely to live in poverty.',
  openGraph: {
    title: 'How Many Disabled People Are Being Left Out of Work?',
    description: 'The disability employment gap stands at 28.4 percentage points — 53.7% of disabled people are in work, vs 82.1% of non-disabled people. 2.5 million people are out of work due to long-term sickness. PIP assessments are being overhauled as the benefits bill reaches £64 billion. Disabled people are twice as likely to live in poverty.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disability-employment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Disabled People Are Being Left Out of Work?',
    description: 'The disability employment gap stands at 28.4 percentage points — 53.7% of disabled people are in work, vs 82.1% of non-disabled people. 2.5 million people are out of work due to long-term sickness. PIP assessments are being overhauled as the benefits bill reaches £64 billion. Disabled people are twice as likely to live in poverty.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disability-employment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
