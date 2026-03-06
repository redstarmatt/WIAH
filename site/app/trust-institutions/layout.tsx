import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust in Institutions',
  description: 'Trust in politicians has fallen to just 12% — the lowest ever recorded. Trust in the NHS has fallen from 72% to 51% since 2010. But nurses (94%) and doctors (91',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
