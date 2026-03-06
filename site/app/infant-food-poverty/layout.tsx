import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infant Food Poverty',
  description: 'Baby banks served over 200,000 families in 2023, and 1 in 3 low-income parents says they have struggled to afford infant formula.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
