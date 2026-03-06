import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housebuilding',
  description: 'England built 234,400 net new homes in 2022/23 — a third fewer than the government\'s 300,000-a-year target.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
