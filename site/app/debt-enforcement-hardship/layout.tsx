import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Enforcement',
  description: '2.4 million bailiff visits took place in 2023, with an average charge of 310 added to debts and nearly half of debtors show signs of vulnerability.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
