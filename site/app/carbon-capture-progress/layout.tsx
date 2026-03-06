import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carbon Capture Progress',
  description: 'The UK has committed to capturing 20–30 MtCO2 per year by 2030, but no commercial carbon capture plant is yet operational — Track-1 projects are delayed until a',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
