import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Light Pollution',
  description: 'Artificial sky glow increases by 2% annually, with only six designated Dark Sky areas in England.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
