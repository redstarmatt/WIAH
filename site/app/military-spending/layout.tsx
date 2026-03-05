import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Military Spending',
  description: 'UK defence spending is 2.3% of GDP meeting NATO s 2% target but the British Army is at its smallest since the Napoleonic Wars at 73,000 regular soldiers, total ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
