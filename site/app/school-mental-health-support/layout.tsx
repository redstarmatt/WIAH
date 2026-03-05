import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Only 1 in 3 schools has a mental health lead, and 75% of young people with mental health problems wait more than a year before receiving help.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
