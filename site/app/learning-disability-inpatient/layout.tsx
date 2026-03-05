import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Disability Inpatient',
  description: 'Over 2,000 people with learning disabilities and autism remain in inpatient psychiatric facilities, many for years at a time.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
