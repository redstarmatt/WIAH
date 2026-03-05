import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pension Savings Gap',
  description: 'The UK faces a £350 billion pension savings gap, with 39% of self-employed workers saving nothing for retirement.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
