import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Renters Are Falling Behind?',
  description: 'One in seven renters in England is now behind on their rent, the highest rate on record. Landlord possession claims in county courts hit 164,200 in 2024 &mdash; surpassing pre-pandemic levels &mdash; and evictions are rising sharply as the cost-of-living crisis meets a housing market where rents have increased 30&percnt; in four years.',
  openGraph: {
    title: 'How Many Renters Are Falling Behind?',
    description: 'One in seven renters in England is now behind on their rent, the highest rate on record. Landlord possession claims in county courts hit 164,200 in 2024 &mdash; surpassing pre-pandemic levels &mdash; and evictions are rising sharply as the cost-of-living crisis meets a housing market where rents have increased 30&percnt; in four years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rent-arrears',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Renters Are Falling Behind?',
    description: 'One in seven renters in England is now behind on their rent, the highest rate on record. Landlord possession claims in county courts hit 164,200 in 2024 &mdash; surpassing pre-pandemic levels &mdash; and evictions are rising sharply as the cost-of-living crisis meets a housing market where rents have increased 30&percnt; in four years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rent-arrears',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
