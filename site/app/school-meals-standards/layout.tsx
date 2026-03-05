import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Schools broadly meet nutritional standards but free school meal uptake falls well below eligibility, and primary school universality ends at Year 2.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
