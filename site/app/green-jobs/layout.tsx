import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Jobs',
  description: 'The low-carbon economy employs 763,000 people in the UK up from 430,000 in 2014 and pays a wage premium of around 8% above comparable non-green roles. But green',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
