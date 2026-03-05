import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing',
  description: 'Multigenerational households have grown by 33% since 2001 driven primarily by housing costs forcing adult children to stay at home.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
