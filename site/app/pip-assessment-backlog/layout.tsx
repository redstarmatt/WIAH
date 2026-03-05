import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PIP Assessment Backlog',
  description: 'New PIP claimants wait an average of 24 weeks for a decision and when they appeal, 71% of tribunal decisions overturn the DWP s original ruling.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
