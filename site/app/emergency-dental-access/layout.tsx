import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dental Access',
  description: '14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency depart',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
