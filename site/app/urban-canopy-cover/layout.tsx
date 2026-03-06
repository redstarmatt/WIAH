import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Urban Canopy Cover',
  description: 'London has more tree canopy than most European capitals, but the most deprived urban areas have half the green space of wealthy neighbourhoods.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
