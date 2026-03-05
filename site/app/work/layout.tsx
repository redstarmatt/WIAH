import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Data and analysis on Work in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
