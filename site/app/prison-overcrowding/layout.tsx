import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prison Overcrowding',
  description: 'England and Wales have 88,225 prisoners in jails built for 79,927 110% of usable capacity. In September 2023, a temporary early-release scheme freed 1,700 priso',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
