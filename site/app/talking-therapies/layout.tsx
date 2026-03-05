import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Talking Therapies',
  description: 'NHS Talking Therapies treats 1.2 million people annually but 1 in 3 people referred never start treatment, and recovery rates vary from 40% to 75% between provi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
