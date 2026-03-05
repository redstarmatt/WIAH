import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sickness Benefit Claimants',
  description: '3.1 million people are on health-related benefits a 30% rise in two years driven by mental health, musculoskeletal and long COVID conditions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
