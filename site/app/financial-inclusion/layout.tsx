import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Inclusion',
  description: '1.2 million UK adults remain unbanked while bank branch closures have removed 6,200 access points since 2015, concentrated in deprived areas.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
