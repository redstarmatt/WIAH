import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is There Enough Housing for Vulnerable People?',
  description: 'There is a shortfall of 45,000 supported housing units, leaving tens of thousands of vulnerable adults in inappropriate settings.',
  openGraph: {
    title: 'Is There Enough Housing for Vulnerable People?',
    description: 'There is a shortfall of 45,000 supported housing units, leaving tens of thousands of vulnerable adults in inappropriate settings.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/supported-housing-shortage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is There Enough Housing for Vulnerable People?',
    description: 'There is a shortfall of 45,000 supported housing units, leaving tens of thousands of vulnerable adults in inappropriate settings.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/supported-housing-shortage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
