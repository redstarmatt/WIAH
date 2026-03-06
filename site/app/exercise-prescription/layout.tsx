import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exercise Prescription',
  description: 'Physical activity referrals have reached 680,000 a year and show strong evidence of benefit yet most GPs still default to medication.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
