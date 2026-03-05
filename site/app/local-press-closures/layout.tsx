import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Press Closures',
  description: 'Over 320 local newspapers have closed since 2008, leaving more than 200 communities with no local press coverage at all.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
