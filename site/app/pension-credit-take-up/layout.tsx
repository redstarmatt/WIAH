import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pension Credit',
  description: 'Around 800,000 eligible pensioners do not claim Pension Credit — worth up to £3,900 per year — leaving £1.5 billion unclaimed annually.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
