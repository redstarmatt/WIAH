import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Travel Investment',
  description: 'Active Travel England investment reached 1.1 billion in 2023, but cycling represents just 2.4% of trips well below comparable European countries.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
