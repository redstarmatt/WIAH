import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental',
  description: 'NHS dentistry has effectively collapsed for millions. Nearly half of adults cannot access an NHS dentist, and the workforce continues to shrink as practitioners',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
