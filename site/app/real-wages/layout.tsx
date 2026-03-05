import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economy & Work',
  description: 'Real wages in 2024 are still around 1% below their 2008 peak — the longest sustained pay stagnation since the Napoleonic Wars. The brief recovery before COVID w',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
