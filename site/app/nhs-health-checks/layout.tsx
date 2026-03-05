import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Health Checks',
  description: 'Only 48% of eligible people offered an NHS Health Check actually complete one, with large gaps by deprivation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
