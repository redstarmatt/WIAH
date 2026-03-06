import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Uniform Costs',
  description: 'Average annual school uniform cost exceeds 300 pounds per secondary pupil, with branded items a major driver.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
