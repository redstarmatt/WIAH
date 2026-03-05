import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planning',
  description: 'Data and analysis on Planning in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
