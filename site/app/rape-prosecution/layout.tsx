import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rape Prosecution',
  description: 'Fewer than 3% of reported rapes result in a charge. The average wait from report to trial now exceeds 1,000 days. Despite a doubling in reporting since 2015, th',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
