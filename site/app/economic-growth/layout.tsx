import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economy & Work',
  description: 'UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. Labour productivity is 20% below Germany. 2023 saw just 0.1% growth. The UK has und',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
