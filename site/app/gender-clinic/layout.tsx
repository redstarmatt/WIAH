import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gender Clinics',
  description: 'The average wait for a gender identity clinic first appointment reached 5 7 years in 2023, with over 26,000 people on waiting lists a sevenfold increase in eigh',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
