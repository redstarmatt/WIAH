import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Absence Trends',
  description: 'One in five children missed more than 10% of school in 2022/23 a persistent absence rate that has more than doubled since before the pandemic.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
