import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Bad Is Pavement Parking?',
  description: 'An estimated 80% of wheelchair users report difficulty navigating pavements due to illegal parking, with limited enforcement.',
  openGraph: {
    title: 'How Bad Is Pavement Parking?',
    description: 'An estimated 80% of wheelchair users report difficulty navigating pavements due to illegal parking, with limited enforcement.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pavement-parking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Bad Is Pavement Parking?',
    description: 'An estimated 80% of wheelchair users report difficulty navigating pavements due to illegal parking, with limited enforcement.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pavement-parking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
