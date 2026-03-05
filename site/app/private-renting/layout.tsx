import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Renting',
  description: 'Data and analysis on Private Renting in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
