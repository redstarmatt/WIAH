import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supply Chain Resilience',
  description: 'The UK imports 46% of its food one of the highest ratios in the G7. The goods trade deficit hit 186 billion in 2022. Supply chain disruptions since 2020 (COVID,',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
