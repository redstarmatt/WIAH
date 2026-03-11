import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Where Are Children Poorest?`,
  description: '4.3 million children live in poverty in the UK. Child poverty rates vary from 6% in affluent Surrey to 45% in Tower Hamlets, revealing how postcode determines life chances.',
  openGraph: {
    title: `Where Are Children Poorest?`,
    description: '4.3 million children live in poverty in the UK. Child poverty rates vary from 6% in affluent Surrey to 45% in Tower Hamlets, revealing how postcode determines life chances.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-poverty-local',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Where Are Children Poorest?`,
    description: '4.3 million children live in poverty in the UK. Child poverty rates vary from 6% in affluent Surrey to 45% in Tower Hamlets, revealing how postcode determines life chances.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-poverty-local',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
