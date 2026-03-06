import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is England building enough homes?',
  description: 'England added 234,400 net dwellings in 2022/23 — against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulative shortfall since 2010 is estimated at over 2 million homes.',
  openGraph: {
    title: 'Is England building enough homes?',
    description: 'England added 234,400 net dwellings in 2022/23 — against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulative shortfall since 2010 is estimated at over 2 million homes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/net-housing-supply',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is England building enough homes?',
    description: 'England added 234,400 net dwellings in 2022/23 — against a government target of 300,000. The target has been missed every year since 2010 except once. The cumulative shortfall since 2010 is estimated at over 2 million homes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/net-housing-supply',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
