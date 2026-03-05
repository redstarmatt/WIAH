import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Affordability',
  description: 'Average water bills have risen to £448 a year, and 22% of households are in \'water poverty\' — spending more than 3% of their income on water.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
