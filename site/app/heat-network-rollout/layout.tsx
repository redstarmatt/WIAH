import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heat Network Rollout',
  description: 'Heat networks supply less than 3% of UK heat demand — far below the 20% target for 2050 — and many existing networks still emit more than individual boilers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
