import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Disconnections',
  description: 'Self-disconnections — where prepayment customers run out of credit — reached 3.2 million in 2023, even as forced disconnections fell under regulatory pressure.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
