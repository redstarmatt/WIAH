import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environment & Climate',
  description: 'Only 14% of English rivers are in good ecological status — and the UK has missed every water quality improvement target since 2004. Just 35% of monitored river ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
