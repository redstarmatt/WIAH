import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'Remote working has driven rural house prices up 8% above pre-pandemic trend and 38% of rural areas now have price-to-earnings ratios above 10.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
