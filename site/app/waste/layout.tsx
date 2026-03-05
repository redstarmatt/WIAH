import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waste',
  description: 'Data and analysis on Waste in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
