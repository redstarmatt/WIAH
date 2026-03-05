import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'National Debt',
  description: 'UK public debt reached 98.8% of GDP in 2024 the highest since the 1960s with interest payments of 112bn annually, consuming more than 1 in every 9 of tax revenu',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
