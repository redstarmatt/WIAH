import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Enterprise Growth',
  description: 'The UK\'s 100,000 social enterprises generate £60 billion a year and employ 2.3 million people — a quiet success story that almost nobody knows about.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
