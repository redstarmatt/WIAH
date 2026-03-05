import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Universities',
  description: 'Data and analysis on Universities in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
