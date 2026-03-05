import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Offices',
  description: 'The UK has lost 7,210 post office branches since 2000, a decline of 39%. Around 11,180 remain, but rural communities have been disproportionately affected, with',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
