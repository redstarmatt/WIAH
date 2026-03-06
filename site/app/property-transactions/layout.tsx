import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Has the Housing Market Seized Up?',
  description: 'Residential property transactions fell to a decade low in 2023 as mortgage rates doubled, freezing the market for movers and buyers alike.',
  openGraph: {
    title: 'Has the Housing Market Seized Up?',
    description: 'Residential property transactions fell to a decade low in 2023 as mortgage rates doubled, freezing the market for movers and buyers alike.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/property-transactions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Has the Housing Market Seized Up?',
    description: 'Residential property transactions fell to a decade low in 2023 as mortgage rates doubled, freezing the market for movers and buyers alike.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/property-transactions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
