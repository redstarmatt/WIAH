import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport',
  description: 'Data and analysis on Transport in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
