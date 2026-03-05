import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Oxford and Cambridge have made progress but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
