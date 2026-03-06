import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many British Homes Are Unfit to Live In?',
  description: '4.3 million homes in England do not meet the Decent Homes Standard. 1 million privately rented properties have Category 1 hazards (serious risk to health). The death of Awaab Ishak from mould in a Rochdale social housing flat (2020) exposed the crisis in damp and disrepair. Cold, damp homes cost the NHS £1.4 billion per year.',
  openGraph: {
    title: 'How Many British Homes Are Unfit to Live In?',
    description: '4.3 million homes in England do not meet the Decent Homes Standard. 1 million privately rented properties have Category 1 hazards (serious risk to health). The death of Awaab Ishak from mould in a Rochdale social housing flat (2020) exposed the crisis in damp and disrepair. Cold, damp homes cost the NHS £1.4 billion per year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing-quality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many British Homes Are Unfit to Live In?',
    description: '4.3 million homes in England do not meet the Decent Homes Standard. 1 million privately rented properties have Category 1 hazards (serious risk to health). The death of Awaab Ishak from mould in a Rochdale social housing flat (2020) exposed the crisis in damp and disrepair. Cold, damp homes cost the NHS £1.4 billion per year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing-quality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
