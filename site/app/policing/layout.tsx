import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Policing',
  description: 'Data and analysis on Policing in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
