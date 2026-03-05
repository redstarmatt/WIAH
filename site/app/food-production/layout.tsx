import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Production',
  description: 'The UK produces just 57.8% of its own food, down from 78% in 1984 and the lowest level since records began. Import dependency is rising at the same time as glob',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
