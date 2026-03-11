import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Paying Its Way in the World?`,
  description: 'The UK runs a persistent trade deficit of £37bn. Post-Brexit friction widened the goods deficit while services exports reached a record high, only partially offsetting the gap.',
  openGraph: {
    title: `Is Britain Paying Its Way in the World?`,
    description: 'The UK runs a persistent trade deficit of £37bn. Post-Brexit friction widened the goods deficit while services exports reached a record high, only partially offsetting the gap.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trade-balance',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Paying Its Way in the World?`,
    description: 'The UK runs a persistent trade deficit of £37bn. Post-Brexit friction widened the goods deficit while services exports reached a record high, only partially offsetting the gap.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trade-balance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
