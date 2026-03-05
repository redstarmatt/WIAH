import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Building Condition',
  description: 'Over 700,000 pupils are in schools rated as having critical or poor building conditions, with a maintenance backlog exceeding 11 billion pounds.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
