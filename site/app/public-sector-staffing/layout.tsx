import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Sector Staffing',
  description: 'Civil service vacancy rates hit record highs while experienced staff leave for the private sector.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
