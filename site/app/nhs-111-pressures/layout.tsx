import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS 111 Pressures',
  description: '26 million calls a year, 1 in 7 abandoned NHS 111 is overwhelmed as it absorbs demand from A E and GP services.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
