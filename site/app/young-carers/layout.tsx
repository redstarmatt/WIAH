import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Young Carers',
  description: '800,000 children in the UK are providing unpaid care for a family member, often missing school and missing out on childhood yet most are invisible to the servic',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
