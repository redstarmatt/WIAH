import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens to Britain's Electronic Waste?',
  description: 'The UK generates 1.5 million tonnes of e-waste annually, with less than half formally recycled.',
  openGraph: {
    title: 'What Happens to Britain's Electronic Waste?',
    description: 'The UK generates 1.5 million tonnes of e-waste annually, with less than half formally recycled.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/e-waste-recycling',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens to Britain's Electronic Waste?',
    description: 'The UK generates 1.5 million tonnes of e-waste annually, with less than half formally recycled.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/e-waste-recycling',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
