import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Security',
  description: 'The 2022 energy crisis exposed Britain s dependence on imported gas: with no long-term storage and volatile global markets, household bills quadrupled and the g',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
