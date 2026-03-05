import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elder Financial Abuse',
  description: 'Over 190,000 older people experience financial abuse every year in the UK, with £3.6 billion stolen annually — but fewer than 1 in 20 cases is ever reported.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
