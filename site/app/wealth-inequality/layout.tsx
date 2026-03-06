import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wealth Inequality',
  description: 'The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% a gap that has widened since 2006 and is driven primarily by property a',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
