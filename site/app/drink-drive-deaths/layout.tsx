import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drink Drive Deaths',
  description: '280 people died in drink-drive collisions in 2022 the same number as a decade ago, despite stricter enforcement and campaigning.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
