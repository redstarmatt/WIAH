import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Road Safety',
  description: 'Road deaths in Great Britain fell dramatically from 7,000 in 1972 to 1,695 in 2023 but progress stalled after 2010, and cyclists and pedestrians remain signific',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
