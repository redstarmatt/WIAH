import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teen Conception Rates',
  description: 'Under-18 conception rates have fallen to a record low of 13 per 1,000 one of the greatest public health successes of the past 25 years.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
