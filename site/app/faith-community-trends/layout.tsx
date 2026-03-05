import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Faith Community Trends',
  description: 'For the first time, more than half of people in England and Wales have no religion — but faith communities still provide £12 billion of social value annually.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
