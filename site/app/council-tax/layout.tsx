import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Council Tax',
  description: 'Council tax in England has risen 25% in real terms since 2016 with many councils raising bills by the maximum permitted 5% per year yet local authorities are si',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
