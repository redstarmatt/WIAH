import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How long do people wait for mental health treatment?',
  description: 'UK data and statistics on how long do people wait for mental health treatment?. What is actually happening?',
  openGraph: {
    title: 'How long do people wait for mental health treatment?',
    description: 'UK data and statistics on how long do people wait for mental health treatment?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/mental-health-waits',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How long do people wait for mental health treatment?',
    description: 'UK data and statistics on how long do people wait for mental health treatment?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/mental-health-waits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
