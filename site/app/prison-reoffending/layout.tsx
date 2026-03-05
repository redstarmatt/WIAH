import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prison Reoffending',
  description: 'Over half of adults released from prison reoffend within a year, and the reoffending rate for short-sentence prisoners is 64% yet the courses, treatment, and po',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
