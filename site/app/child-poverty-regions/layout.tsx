import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child Poverty',
  description: '4.3 million children are in poverty in the UK — 30% of all children. The North East has the highest regional rate at 33%. 67% of children in poverty live in wor',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
