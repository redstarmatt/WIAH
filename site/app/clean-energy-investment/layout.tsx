import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clean Energy Investment',
  description: 'UK clean energy investment reached £50 billion in 2023 but it still trails the US Inflation Reduction Act stimulus by a factor of three.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
