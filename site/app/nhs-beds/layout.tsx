import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Beds',
  description: 'England has 99,000 hospital beds down from 300,000 in 1987 and the lowest per capita in the developed world. Bed occupancy runs at 94% above the 85% safety thre',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
