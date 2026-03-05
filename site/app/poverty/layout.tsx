import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poverty',
  description: 'Data and analysis on Poverty in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
