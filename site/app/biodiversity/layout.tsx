import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biodiversity',
  description: 'The UK biodiversity picture is more complicated than crisis only . 41% of species have declined since 1970 but red kites went from near-extinction to 10,000 bir',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
