import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voter ID Impact',
  description: 'An estimated 14,000 people were turned away at polling stations in 2023 local elections after the new voter ID requirements.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
