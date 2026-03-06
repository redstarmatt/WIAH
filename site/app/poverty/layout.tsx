import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Actually Struggling to Get By?',
  description: 'UK data and statistics on who is actually struggling to get by?. What is actually happening?',
  openGraph: {
    title: 'Who Is Actually Struggling to Get By?',
    description: 'UK data and statistics on who is actually struggling to get by?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Actually Struggling to Get By?',
    description: 'UK data and statistics on who is actually struggling to get by?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
