import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are We Burning Too Much Rubbish?`,
  description: 'EfW capacity has doubled to 15.4 million tonnes since 2014 and now processes more waste than landfill. Critics warn it locks the UK into high-carbon waste treatment and undermines recycling incentives.',
  openGraph: {
    title: `Are We Burning Too Much Rubbish?`,
    description: 'EfW capacity has doubled to 15.4 million tonnes since 2014 and now processes more waste than landfill. Critics warn it locks the UK into high-carbon waste treatment and undermines recycling incentives.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/incineration-growth',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are We Burning Too Much Rubbish?`,
    description: 'EfW capacity has doubled to 15.4 million tonnes since 2014 and now processes more waste than landfill. Critics warn it locks the UK into high-carbon waste treatment and undermines recycling incentives.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/incineration-growth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
