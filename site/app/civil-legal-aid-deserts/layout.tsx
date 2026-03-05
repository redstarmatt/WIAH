import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Legal Aid Deserts',
  description: '54% of local authority areas in England and Wales have no housing legal aid provider, leaving millions without access to legal help.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
