import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: '7.1 million adults in England have literacy skills at or below the level expected of a primary school child.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
