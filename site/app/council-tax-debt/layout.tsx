import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Council Tax Debt',
  description: 'UK councils are owed £5.7 billion in unpaid council tax — a 45% increase since 2019 — and aggressive enforcement using bailiffs is driving some households into ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
