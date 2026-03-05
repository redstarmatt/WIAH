import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Economy',
  description: 'Data and analysis on Economy in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
