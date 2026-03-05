import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knife Crime Geography',
  description: 'Knife offences vary 12-fold between police force areas with London recording three times the national average rate.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
