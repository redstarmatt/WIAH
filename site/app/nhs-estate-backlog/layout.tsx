import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Estate Backlog',
  description: 'The NHS maintenance backlog exceeds £11 billion, with a growing proportion rated as high or significant risk.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
