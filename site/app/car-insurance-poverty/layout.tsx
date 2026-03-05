import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Insurance',
  description: 'Average UK car insurance premiums rose 58% in 2023 to £924 — with young drivers in cities facing premiums over £2,800 — leaving some workers unable to afford to',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
