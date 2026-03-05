import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mental Health Crisis Beds',
  description: 'Mental health inpatient beds have been cut by over 40% since 1998, with occupancy rates regularly exceeding 100%.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
