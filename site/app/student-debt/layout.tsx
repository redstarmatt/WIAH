import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What does a degree actually cost?',
  description: 'The average English student now graduates with &pound;45,000 of debt, a system that transfers cost from the state to individuals &mdash; most of whom will never fully repay it.',
  openGraph: {
    title: 'What does a degree actually cost?',
    description: 'The average English student now graduates with &pound;45,000 of debt, a system that transfers cost from the state to individuals &mdash; most of whom will never fully repay it.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/student-debt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What does a degree actually cost?',
    description: 'The average English student now graduates with &pound;45,000 of debt, a system that transfers cost from the state to individuals &mdash; most of whom will never fully repay it.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/student-debt',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
