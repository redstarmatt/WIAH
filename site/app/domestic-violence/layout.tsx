import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Violence',
  description: '2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% o',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
