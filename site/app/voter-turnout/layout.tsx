import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Democracy',
  description: 'General election turnout has recovered since its 2001 low but remains below the post-war average, while local election participation has collapsed to under 30% ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
