import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Disabilities',
  description: 'People with learning disabilities die on average 23 years younger than the general population. Nearly 2,000 remain in inpatient settings despite a decade-old pr',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
