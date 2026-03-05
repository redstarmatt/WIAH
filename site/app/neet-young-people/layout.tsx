import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: '857,000 young people aged 16 24 are not in education, employment or training nearly 1 in 8 of their age group.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
