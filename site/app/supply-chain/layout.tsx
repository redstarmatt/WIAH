import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How dependent is Britain on imports?',
  description: 'The UK imports 46% of its food &mdash; one of the highest ratios in the G7. The goods trade deficit hit &pound;186 billion in 2022. Supply chain disruptions since 2020 (COVID, Brexit, Ukraine) have revealed structural vulnerabilities in energy, medicines and food.',
  openGraph: {
    title: 'How dependent is Britain on imports?',
    description: 'The UK imports 46% of its food &mdash; one of the highest ratios in the G7. The goods trade deficit hit &pound;186 billion in 2022. Supply chain disruptions since 2020 (COVID, Brexit, Ukraine) have revealed structural vulnerabilities in energy, medicines and food.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/supply-chain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How dependent is Britain on imports?',
    description: 'The UK imports 46% of its food &mdash; one of the highest ratios in the G7. The goods trade deficit hit &pound;186 billion in 2022. Supply chain disruptions since 2020 (COVID, Brexit, Ukraine) have revealed structural vulnerabilities in energy, medicines and food.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/supply-chain',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
