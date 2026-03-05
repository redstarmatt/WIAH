import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Data and analysis on Education in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
