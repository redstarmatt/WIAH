import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CAMHS Access',
  description: 'More than half of children referred to CAMHS wait over 18 weeks, and over a quarter of referrals are rejected outright.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
