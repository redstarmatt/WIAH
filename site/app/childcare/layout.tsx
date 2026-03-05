import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Childcare',
  description: 'Data and analysis on Childcare in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
