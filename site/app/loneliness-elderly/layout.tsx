import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elderly Loneliness',
  description: '1.4 million people over 65 are chronically lonely, with loneliness linked to a 26% increased risk of premature death.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
