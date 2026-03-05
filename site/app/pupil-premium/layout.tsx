import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pupil Premium',
  description: 'The Pupil Premium has invested £2.9 billion per year to close the attainment gap between disadvantaged pupils and their peers. The gap narrowed 4 percentage poi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
