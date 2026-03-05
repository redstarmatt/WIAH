import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ocean Acidification',
  description: 'UK coastal waters have become approximately 30% more acidic since pre-industrial times, threatening marine ecosystems.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
