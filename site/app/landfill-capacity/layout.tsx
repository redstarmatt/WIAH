import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Running Out of Landfill Space?`,
  description: 'England's remaining landfill capacity is projected to be exhausted within 12 years at current rates. Five counties have no operational landfill, driving waste 100+ miles to distant sites.',
  openGraph: {
    title: `Is Britain Running Out of Landfill Space?`,
    description: 'England's remaining landfill capacity is projected to be exhausted within 12 years at current rates. Five counties have no operational landfill, driving waste 100+ miles to distant sites.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/landfill-capacity',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Running Out of Landfill Space?`,
    description: 'England's remaining landfill capacity is projected to be exhausted within 12 years at current rates. Five counties have no operational landfill, driving waste 100+ miles to distant sites.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/landfill-capacity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
