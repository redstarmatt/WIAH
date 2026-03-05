import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: '6.3% of UK university students drop out in their first year, with rates of 12% among disadvantaged students — driven sharply upward by cost of living pressures.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
