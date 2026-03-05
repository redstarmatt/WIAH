import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Screen Time & Wellbeing',
  description: 'Average screen time for 5-15 year olds exceeds 4 hours daily, though the relationship with wellbeing is more nuanced than headlines suggest.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
