import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plastic Pollution',
  description: 'The UK generates 5.6 million tonnes of plastic waste per year the second highest per capita in the world after the United States. The domestic recycling rate ha',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
