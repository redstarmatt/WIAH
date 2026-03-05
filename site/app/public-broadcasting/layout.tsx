import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Broadcasting',
  description: 'The BBC licence fee was frozen at 159 and then increased below inflation until 2027, cutting real-terms income by over 1 billion compared with what a CPI-linked',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
