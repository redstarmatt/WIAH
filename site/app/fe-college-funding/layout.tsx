import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Funding per further education student has fallen 28% in real terms since 2010 and 22% of colleges are in financial difficulty.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
