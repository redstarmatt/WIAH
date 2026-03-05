import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child mental health',
  description: 'Over 1.8 million under-18s are in contact with NHS mental health services a record high but half of those referred wait more than 18 weeks. Hospital admissions ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
