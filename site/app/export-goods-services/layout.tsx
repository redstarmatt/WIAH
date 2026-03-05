import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Exports',
  description: 'UK services exports hit a record £400 billion in 2023, compensating for weak goods exports — but the trade deficit remains stubborn.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
