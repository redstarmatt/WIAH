import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the State Pension Actually Enough to Live On?',
  description: 'The state pension has risen 127% since 2010 under the triple lock, reaching £221.20 a week. But 2.1 million pensioners &mdash; 19% &mdash; still live in poverty after housing costs, and auto-enrolment has left 12% of eligible workers without a workplace pension.',
  openGraph: {
    title: 'Is the State Pension Actually Enough to Live On?',
    description: 'The state pension has risen 127% since 2010 under the triple lock, reaching £221.20 a week. But 2.1 million pensioners &mdash; 19% &mdash; still live in poverty after housing costs, and auto-enrolment has left 12% of eligible workers without a workplace pension.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pensions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the State Pension Actually Enough to Live On?',
    description: 'The state pension has risen 127% since 2010 under the triple lock, reaching £221.20 a week. But 2.1 million pensioners &mdash; 19% &mdash; still live in poverty after housing costs, and auto-enrolment has left 12% of eligible workers without a workplace pension.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pensions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
