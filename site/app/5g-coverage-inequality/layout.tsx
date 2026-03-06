import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5G Coverage Inequality',
  description: '5G coverage reaches 50% of the UK population but only 12% of rural areas, creating a growing digital divide.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
