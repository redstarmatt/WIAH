import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shoplifting Surge',
  description: 'Recorded shoplifting offences reached 469,000 in 2024, a 30% increase in a single year, with organised retail crime escalating.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
