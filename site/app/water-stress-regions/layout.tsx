import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Running Out of Water?',
  description: 'South East England faces a supply-demand deficit of 5 billion litres per day by 2050 — yet no major new reservoir has been built since 1991.',
  openGraph: {
    title: 'Is Britain Running Out of Water?',
    description: 'South East England faces a supply-demand deficit of 5 billion litres per day by 2050 — yet no major new reservoir has been built since 1991.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water-stress-regions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Running Out of Water?',
    description: 'South East England faces a supply-demand deficit of 5 billion litres per day by 2050 — yet no major new reservoir has been built since 1991.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water-stress-regions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
