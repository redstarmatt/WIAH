import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alternative Provision',
  description: 'Over 40,000 children are in alternative provision at any one time, with poor outcomes and limited oversight.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
