import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Bills',
  description: 'Data and analysis on Energy Bills in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
