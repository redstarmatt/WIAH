import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perinatal Mental Health',
  description: 'One in ten mothers experiences postnatal depression, yet specialist Mother and Baby Units are available in fewer than half of NHS regions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
