import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero-Hours Contracts',
  description: 'Over 1.1 million workers in the UK are on zero-hours contracts a figure that has nearly trebled since 2013 leaving them without sick pay entitlement, pension au',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
