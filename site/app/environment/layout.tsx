import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environment',
  description: 'Data and analysis on Environment in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
