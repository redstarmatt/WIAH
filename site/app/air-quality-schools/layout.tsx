import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Air Quality in Schools',
  description: 'Nearly 1 million UK children attend schools in areas exceeding WHO pollution guidelines, though London\'s ULEZ has begun to show measurable progress.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
