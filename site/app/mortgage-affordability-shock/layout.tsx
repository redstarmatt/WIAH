import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Affordability Shock',
  description: 'Mortgage payments for new buyers now consume 41% of take-home pay and 800,000 households face payment shocks averaging 300 more per month.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
