import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lead Water Pipes',
  description: 'An estimated 8 million UK homes still have lead water pipes, with no national replacement programme.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
