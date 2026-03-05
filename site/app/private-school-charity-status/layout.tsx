import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Independent schools claimed £522 million in charitable tax relief annually while educating 7% of pupils — relief removed alongside VAT on fees in January 2025.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
