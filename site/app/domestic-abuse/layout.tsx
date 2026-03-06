import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Abuse',
  description: '2.1 million adults experienced domestic abuse in England and Wales in 2022/23 1.4 million women and 700,000 men. Police recorded 906,535 domestic abuse-related ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
