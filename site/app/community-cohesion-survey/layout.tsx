import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Cohesion',
  description: '59% of people feel their local community belongs together — a figure that has fallen 6 percentage points since the pandemic and varies sharply by deprivation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
