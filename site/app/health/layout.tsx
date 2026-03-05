import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health',
  description: 'Data and analysis on Health in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
