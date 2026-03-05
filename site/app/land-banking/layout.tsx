import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Land Banking',
  description: 'The UK s top 10 housebuilders hold planning permission for over 1 million homes they have not yet started building a phenomenon known as land banking that criti',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
