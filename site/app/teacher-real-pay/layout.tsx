import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Teacher salaries have fallen 9% in real terms since 2010, making Britain an increasingly unattractive place to enter the profession.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
