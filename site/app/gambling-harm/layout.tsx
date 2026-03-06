import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gambling Harm',
  description: 'Around 300,000 people in Great Britain are problem gamblers, 1.8 million more are at risk, and online gambling growth has outpaced the regulatory system designe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
