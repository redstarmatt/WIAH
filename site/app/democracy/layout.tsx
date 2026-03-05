import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Democracy',
  description: 'Data and analysis on Democracy in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
