import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leasehold',
  description: 'Nearly 5 million homes in England and Wales are held on a leasehold basis a feudal tenure system that gives freeholders the power to charge escalating ground re',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
