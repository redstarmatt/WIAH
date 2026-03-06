import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Everyone Get Flood Insurance?',
  description: '200,000 properties are only insurable through the Flood Re scheme — and 5.2 million are in areas at significant flood risk.',
  openGraph: {
    title: 'Can Everyone Get Flood Insurance?',
    description: '200,000 properties are only insurable through the Flood Re scheme — and 5.2 million are in areas at significant flood risk.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/flood-insurance-gaps',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Everyone Get Flood Insurance?',
    description: '200,000 properties are only insurable through the Flood Re scheme — and 5.2 million are in areas at significant flood risk.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/flood-insurance-gaps',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
