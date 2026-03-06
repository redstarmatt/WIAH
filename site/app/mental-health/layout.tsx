import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mental Health',
  description: '1.9 million people are waiting for NHS mental health care. NHS talking therapies (IAPT) see 1.2 million people a year, but only 51% achieve recovery. CAMHS wait',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
