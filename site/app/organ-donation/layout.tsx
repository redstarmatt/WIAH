import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organ Donation',
  description: 'Over 6,300 people are waiting for a transplant in the UK, and around 350 die each year before one becomes available. England s opt-out organ donation law, intro',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
