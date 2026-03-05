import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rail',
  description: 'Data and analysis on Rail in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
