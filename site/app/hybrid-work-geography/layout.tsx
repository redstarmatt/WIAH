import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hybrid Work Geography',
  description: '28% of UK workers work from home at least partly but this drops to 4% in manual occupations, creating a two-tier labour market by geography and class.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
