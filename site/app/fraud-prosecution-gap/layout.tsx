import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why is almost no fraud being prosecuted?',
  description: 'Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources.',
  openGraph: {
    title: 'Why is almost no fraud being prosecuted?',
    description: 'Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fraud-prosecution-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why is almost no fraud being prosecuted?',
    description: 'Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fraud-prosecution-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
