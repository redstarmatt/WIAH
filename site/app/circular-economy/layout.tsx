import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recycling & Circular Economy',
  description: 'England s recycling rate has stalled at around 44% for a decade below the EU average of 48% and far short of the 65% target for 2035. The good news: landfill ha',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
