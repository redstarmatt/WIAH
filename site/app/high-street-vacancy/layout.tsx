import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High Street Vacancy',
  description: 'Nearly one in seven retail units now stands empty — a vacancy rate of 13.9% that masks complete collapse in some market towns.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
