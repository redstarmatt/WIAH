import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graduate Outcomes',
  description: '76.9% of graduates are in professional or managerial employment 15 months after graduation. The lifetime graduate earnings premium is around £140,000. But outco',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
