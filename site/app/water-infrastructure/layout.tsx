import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Infrastructure',
  description: 'Water companies lose 2,780 megalitres per day to leakage roughly 20% of total supply, enough to serve 20 million people. An estimated 25% of England s water pip',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
