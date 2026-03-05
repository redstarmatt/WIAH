import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eating Disorder Waiting Times',
  description: 'More than 40% of urgent eating disorder referrals miss the one-week target, and inpatient beds have declined despite rising demand.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
