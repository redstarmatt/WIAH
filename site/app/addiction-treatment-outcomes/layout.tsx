import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Addiction Treatment',
  description: 'Only 47% of people completing drug or alcohol treatment achieve sustained recovery, and over 4,900 died from drug misuse in 2023.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
