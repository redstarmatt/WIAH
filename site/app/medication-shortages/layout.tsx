import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medication Shortages',
  description: 'Over 100 medicines were in shortage in 2023, affecting hundreds of thousands of patients.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
