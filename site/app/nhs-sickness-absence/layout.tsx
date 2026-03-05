import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Staff Absence',
  description: 'NHS staff absence hit 5.6% in 2022/23 the equivalent of 75,000 full-time staff off sick every day, costing over 3.3 billion annually and compounding existing wo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
