import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are refugees getting mental health support in England?',
  description: '68% of refugees in England have a trauma history, yet only 15% can access specialist mental health support.',
  openGraph: {
    title: 'Are refugees getting mental health support in England?',
    description: '68% of refugees in England have a trauma history, yet only 15% can access specialist mental health support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/refugee-mental-health-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are refugees getting mental health support in England?',
    description: '68% of refugees in England have a trauma history, yet only 15% can access specialist mental health support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/refugee-mental-health-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
