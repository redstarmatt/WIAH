import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marriage & Cohabitation',
  description: 'Marriages fell to 236,000 in 2022 — the lowest since 1972 — while cohabiting couples have grown to 4.2 million, now the fastest-growing family type.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
