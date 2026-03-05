import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payday Loans',
  description: 'The payday loan market collapsed 95% after FCA price caps in 2015, but buy-now-pay-later has created new unregulated debt traps affecting 1.2 million people.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
