import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planning Permission',
  description: 'England granted 474,000 planning permissions in 2023 but only 234,000 new homes were completed a completion rate of under 50% while the planning backlog has rea',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
