import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is There Enough Authorised Space for Traveller Communities?',
  description: 'England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communities.',
  openGraph: {
    title: 'Is There Enough Authorised Space for Traveller Communities?',
    description: 'England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communities.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/traveller-site-provision',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is There Enough Authorised Space for Traveller Communities?',
    description: 'England has a shortfall of around 5,000 authorised Traveller pitches, and planning refusal rates for Traveller applications run double those for settled communities.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/traveller-site-provision',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
