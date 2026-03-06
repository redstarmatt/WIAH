import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing Supply',
  description: 'England added 234,400 net dwellings in 2022/23 against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulat',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
