import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade Unions',
  description: 'Trade union membership stands at 6.73 million less than half the 1979 peak of 13.2 million. Only 23% of UK workers are union members, one of the lowest rates in',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
