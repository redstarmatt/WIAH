import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Where Does Britain's Rubbish Actually Go?`,
  description: 'Landfill has been largely eliminated (5.5%) but replaced by incineration (49%) rather than recycling. Recycling stagnated at 43.8% while energy-from-waste burning has doubled since 2014.',
  openGraph: {
    title: `Where Does Britain's Rubbish Actually Go?`,
    description: 'Landfill has been largely eliminated (5.5%) but replaced by incineration (49%) rather than recycling. Recycling stagnated at 43.8% while energy-from-waste burning has doubled since 2014.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/waste-flows',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Where Does Britain's Rubbish Actually Go?`,
    description: 'Landfill has been largely eliminated (5.5%) but replaced by incineration (49%) rather than recycling. Recycling stagnated at 43.8% while energy-from-waste burning has doubled since 2014.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/waste-flows',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
