import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Debt',
  description: 'The average English student now graduates with 45,000 of debt, a system that transfers cost from the state to individuals most of whom will never fully repay it',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
