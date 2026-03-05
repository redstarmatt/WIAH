import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airport Capacity Utilisation',
  description: 'Heathrow operated at 97% of capacity in 2024, the highest utilisation of any major European hub, with no new runway decision taken.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
