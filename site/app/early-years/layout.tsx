import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Early Years &amp; Childcare',
  description: 'The UK has some of the highest childcare costs in the developed world relative to wages, with a full-time nursery place for a child under two costing 14,800 a y',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
