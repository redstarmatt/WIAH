import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain's Recycling Being Rejected?`,
  description: '82% of residents contaminate their recycling bins. 525,000 tonnes of would-be recycling is rejected each year due to contamination, undermining recycling infrastructure investment.',
  openGraph: {
    title: `Is Britain's Recycling Being Rejected?`,
    description: '82% of residents contaminate their recycling bins. 525,000 tonnes of would-be recycling is rejected each year due to contamination, undermining recycling infrastructure investment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/recycling-contamination',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain's Recycling Being Rejected?`,
    description: '82% of residents contaminate their recycling bins. 525,000 tonnes of would-be recycling is rejected each year due to contamination, undermining recycling infrastructure investment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/recycling-contamination',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
