import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onshore Wind',
  description: 'A de facto ban on onshore wind in England between 2015 and 2023 cost an estimated 13bn in higher energy bills over 8 years. England s capacity flatlined while S',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
