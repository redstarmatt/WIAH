import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Pay',
  description: 'FTSE 100 CEOs earn on average 3.9 million per year 118 times the median UK full-time worker salary a ratio that has more than doubled since 2000.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
