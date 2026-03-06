import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Prisons at Breaking Point?',
  description: 'England and Wales have 88,225 prisoners in jails built for 79,927 &mdash; 110% of usable capacity. In September 2023, a temporary early-release scheme freed 1,700 prisoners to avert collapse. The remand population has hit a record 16,400 &mdash; 24% of all prisoners. Reoffending costs the economy &pound;18 billion a year.',
  openGraph: {
    title: 'Are British Prisons at Breaking Point?',
    description: 'England and Wales have 88,225 prisoners in jails built for 79,927 &mdash; 110% of usable capacity. In September 2023, a temporary early-release scheme freed 1,700 prisoners to avert collapse. The remand population has hit a record 16,400 &mdash; 24% of all prisoners. Reoffending costs the economy &pound;18 billion a year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-overcrowding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Prisons at Breaking Point?',
    description: 'England and Wales have 88,225 prisoners in jails built for 79,927 &mdash; 110% of usable capacity. In September 2023, a temporary early-release scheme freed 1,700 prisoners to avert collapse. The remand population has hit a record 16,400 &mdash; 24% of all prisoners. Reoffending costs the economy &pound;18 billion a year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-overcrowding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
