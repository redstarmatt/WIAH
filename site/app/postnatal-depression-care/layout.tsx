import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Postnatal Depression Care',
  description: 'Around 1 in 5 new mothers experience perinatal mental health problems, but access to specialist support varies widely.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
