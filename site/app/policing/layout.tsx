import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is There Actually Enough Policing?',
  description: 'UK data and statistics on is there actually enough policing?. What is actually happening?',
  openGraph: {
    title: 'Is There Actually Enough Policing?',
    description: 'UK data and statistics on is there actually enough policing?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/policing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is There Actually Enough Policing?',
    description: 'UK data and statistics on is there actually enough policing?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/policing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
