import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Afford Their Pets?',
  description: 'Pet food bank demand has risen 500% since 2020, with an estimated 2 million pet owners struggling to afford veterinary care.',
  openGraph: {
    title: 'Can People Afford Their Pets?',
    description: 'Pet food bank demand has risen 500% since 2020, with an estimated 2 million pet owners struggling to afford veterinary care.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pet-food-banks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Afford Their Pets?',
    description: 'Pet food bank demand has risen 500% since 2020, with an estimated 2 million pet owners struggling to afford veterinary care.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pet-food-banks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
