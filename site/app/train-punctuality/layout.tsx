import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Train Punctuality',
  description: 'Only 63.3% of UK trains arrived on time in 2024, down from 89% pre-privatisation, making British punctuality among the worst in Western Europe.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
