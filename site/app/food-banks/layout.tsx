import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Banks',
  description: 'The Trussell Trust distributed 3.1 million food parcels in 2023/24 more than triple the 2013/14 total. 1.1 million went to children. The independent food bank s',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
