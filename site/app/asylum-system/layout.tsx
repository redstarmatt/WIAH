import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asylum System',
  description: '98,519 asylum applications were made in the UK in 2023 a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
