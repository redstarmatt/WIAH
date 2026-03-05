import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shared Parental Leave',
  description: 'Only 3.6% of eligible fathers take shared parental leave largely because statutory pay at 184 per week makes it financially impossible for most families.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
