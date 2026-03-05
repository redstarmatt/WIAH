import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Prescriptions',
  description: '1.1 billion prescriptions are dispensed in England each year. The prescription charge is 9.90 per item up 60% in real terms since 2000. 90% of prescriptions are',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
