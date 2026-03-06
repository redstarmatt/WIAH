import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Investment Rate',
  description: 'UK business investment as a share of GDP remains among the lowest in the G7, constraining productivity growth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
