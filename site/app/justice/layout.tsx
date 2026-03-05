import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Justice',
  description: 'Data and analysis on Justice in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
