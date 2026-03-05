import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Deaths',
  description: 'Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland s rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
