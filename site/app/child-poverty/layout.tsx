import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child Poverty',
  description: '4.3 million children in the UK live in poverty 31% of all children, the highest rate since 1998. 3.2 million children live in relative poverty after housing cos',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
