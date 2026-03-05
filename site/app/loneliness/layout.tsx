import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loneliness',
  description: 'Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day yet public s',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
