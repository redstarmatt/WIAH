import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy',
  description: 'Data and analysis on Energy in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
