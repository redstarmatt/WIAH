import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Universal Credit',
  description: 'Universal Credit now supports 6.4 million households, but its five-week wait, two-child limit, and benefit cap mean that for many of the most vulnerable claiman',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
