import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the charging network keeping up with electric vehicles?',
  description: 'The UK now has 65,000 public charge points — growing fast. But EV registrations are outpacing infrastructure: there is 1 rapid charger for every 22 EVs, against a government target of 1:10. Rural areas have 8x fewer charge points per capita than cities.',
  openGraph: {
    title: 'Is the charging network keeping up with electric vehicles?',
    description: 'The UK now has 65,000 public charge points — growing fast. But EV registrations are outpacing infrastructure: there is 1 rapid charger for every 22 EVs, against a government target of 1:10. Rural areas have 8x fewer charge points per capita than cities.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ev-charging',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the charging network keeping up with electric vehicles?',
    description: 'The UK now has 65,000 public charge points — growing fast. But EV registrations are outpacing infrastructure: there is 1 rapid charger for every 22 EVs, against a government target of 1:10. Rural areas have 8x fewer charge points per capita than cities.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ev-charging',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
