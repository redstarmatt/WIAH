import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Much of Britain's Freight Goes by Road?`,
  description: '78% of UK freight moves by road vs 63% in Germany. Rail freight (9%) and water (13%) are significantly underused. Road freight generates 31% of UK transport CO2 emissions.',
  openGraph: {
    title: `How Much of Britain's Freight Goes by Road?`,
    description: '78% of UK freight moves by road vs 63% in Germany. Rail freight (9%) and water (13%) are significantly underused. Road freight generates 31% of UK transport CO2 emissions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/freight-road-share',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Much of Britain's Freight Goes by Road?`,
    description: '78% of UK freight moves by road vs 63% in Germany. Rail freight (9%) and water (13%) are significantly underused. Road freight generates 31% of UK transport CO2 emissions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/freight-road-share',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
