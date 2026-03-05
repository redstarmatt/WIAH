import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bus Service Cuts',
  description: 'England has lost 40% of its local bus miles since 2010, with 3,000 villages now having no bus service a public transport collapse outside cities.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
