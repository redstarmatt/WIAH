import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pensions',
  description: 'The state pension has risen 127% since 2010 under the triple lock, reaching £221.20 a week. But 2.1 million pensioners 19% still live in poverty after housing c',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
