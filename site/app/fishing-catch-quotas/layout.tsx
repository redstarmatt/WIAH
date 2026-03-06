import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fishing Catch &amp; Quotas',
  description: 'UK fishing quota increased modestly after Brexit, but total catches continue a long-term decline and 76% of quota is sold to foreign vessels.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
