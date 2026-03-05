import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habitat Condition',
  description: 'Only 53.6% of England s Sites of Special Scientific Interest are in favourable condition well below the 70% target. Lowland meadows have declined by 99.6% since',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
