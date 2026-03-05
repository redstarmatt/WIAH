import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cohabitation Rights Gap',
  description: '3.6 million cohabiting couples have few automatic legal protections, yet 51% mistakenly believe in common law marriage rights that don t exist.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
