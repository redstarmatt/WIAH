import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Police Officer Numbers',
  description: 'England and Wales reached 147,000 officers in 2024 but this still leaves a 4,000 shortfall versus 2010 levels, with less experience and more complex demand.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
