import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Acidic Are Britain's Seas?`,
  description: 'UK coastal waters have become approximately 30% more acidic since pre-industrial times, threatening marine ecosystems.',
  openGraph: {
    title: `How Acidic Are Britain's Seas?`,
    description: 'UK coastal waters have become approximately 30% more acidic since pre-industrial times, threatening marine ecosystems.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ocean-acidification',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Acidic Are Britain's Seas?`,
    description: 'UK coastal waters have become approximately 30% more acidic since pre-industrial times, threatening marine ecosystems.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ocean-acidification',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
