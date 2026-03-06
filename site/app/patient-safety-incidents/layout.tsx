import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Safety Incidents',
  description: '392 never events mistakes so serious they should never occur were recorded in 2023/24, alongside 12,400 serious incidents.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
