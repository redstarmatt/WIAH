import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinship Care Support',
  description: 'An estimated 180,000 children live in kinship care arrangements, yet most kinship carers receive no financial support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
