import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'In-Work Poverty',
  description: '8.1 million people live in working households below the poverty line 60% of all people in poverty live in households where someone works, up from 45% in 1997.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
