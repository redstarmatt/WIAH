import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prisons',
  description: 'The prison population in England and Wales reached 88,000 in 2024 the highest ever, above operational capacity. Reoffending within 12 months: 26%. Assaults are ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
