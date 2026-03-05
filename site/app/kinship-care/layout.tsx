import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinship Care',
  description: 'An estimated 162,000 children in the UK are being raised by grandparents, aunts, uncles, and other relatives yet 69% of kinship carers receive no financial supp',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
