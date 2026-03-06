import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prisoner Recall',
  description: '14,000 prisoners are recalled to custody at any given time making recall one of the fastest-growing drivers of the prison population crisis.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
