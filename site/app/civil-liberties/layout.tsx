import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Liberties',
  description: 'The UK has an estimated 5.2 million CCTV cameras one per 13 people, the highest density of any democracy. Since 2014, a series of laws has expanded surveillance',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
