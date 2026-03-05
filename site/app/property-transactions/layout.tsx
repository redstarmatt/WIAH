import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Transactions',
  description: 'Residential property transactions fell to a decade low in 2023 as mortgage rates doubled, freezing the market for movers and buyers alike.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
