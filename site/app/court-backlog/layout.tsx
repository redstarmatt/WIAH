import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Court Backlog',
  description: '67,573 cases are outstanding in England s Crown Courts up from 41,000 before the pandemic. The 62,000-case target has not been met since 2020. Average time from',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
