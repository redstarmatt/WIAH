import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation & Displacement',
  description: '7.4 million UK jobs are at high risk of automation — but history suggests new jobs are created faster than old ones disappear.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
