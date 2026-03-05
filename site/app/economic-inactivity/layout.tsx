import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economic Inactivity',
  description: 'Data and analysis on Economic Inactivity in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
