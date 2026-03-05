import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'In London, median rent consumes 71% of median take-home pay. Even in Manchester it\'s 48%. These ratios have nearly doubled in a generation — squeezing out worke',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
