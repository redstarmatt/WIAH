import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water',
  description: 'Data and analysis on Water in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
