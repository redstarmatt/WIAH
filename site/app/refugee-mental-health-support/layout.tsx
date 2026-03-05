import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refugee Mental Health Support',
  description: '68% of refugees in England have a trauma history, yet only 15% can access specialist mental health support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
