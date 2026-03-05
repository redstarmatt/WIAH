import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charity Sector Finances',
  description: '6,200 charities folded in 2023 as demand for services soared — while 70% of those still operating report unmet demand they cannot serve.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
