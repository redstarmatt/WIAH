import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anti-Social Behaviour',
  description: '1.6 million anti-social behaviour incidents were recorded in 2023 and fewer than 1 in 3 receive a police response within an hour.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
