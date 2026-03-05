import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Society & Democracy',
  description: 'London\'s output per head is now 181% of the UK average — the North East\'s is 74%. The gap has widened by 30 percentage points since 1997. No major economy has r',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
