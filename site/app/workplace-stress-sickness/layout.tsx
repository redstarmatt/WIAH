import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workplace Stress',
  description: 'Work-related stress and mental ill-health now account for over 17 million lost working days a year more than any other cause of workplace absence.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
