import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Men\'s Mental Health Gap',
  description: 'Men account for 75% of suicides yet are significantly less likely to access mental health services.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
