import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alcohol Misuse',
  description: 'Alcohol-specific deaths in the UK reached a record 9,641 in 2021 and hospital admissions have risen to over 900,000 a year, costing the NHS 3.5 billion yet alco',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
