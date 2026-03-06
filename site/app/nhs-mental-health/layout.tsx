import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Mental Health',
  description: '1.9 million people are in contact with NHS mental health services each month. But waits for talking therapies average 11 weeks; for children s services, 18 week',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
