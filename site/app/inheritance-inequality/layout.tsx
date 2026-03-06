import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inheritance Inequality',
  description: 'Total inherited wealth in Britain has trebled since 1995 and the top 10% of estates account for 50% of all inherited value.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
