import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Inflation',
  description: 'Food and non-alcoholic drink prices rose 19.2% in the year to March 2023 the highest rate in 45 years adding approximately 700 to average household food bills.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
