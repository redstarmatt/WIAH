import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Renters Are Living in Disrepair?',
  description: 'Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects.',
  openGraph: {
    title: 'How Many Renters Are Living in Disrepair?',
    description: 'Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing-disrepair-claims',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Renters Are Living in Disrepair?',
    description: 'Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing-disrepair-claims',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
