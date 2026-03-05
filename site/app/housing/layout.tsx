import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'Data and analysis on Housing in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
