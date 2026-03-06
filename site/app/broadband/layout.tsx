import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are You Actually Connected?',
  description: 'UK data and statistics on are you actually connected?. What is actually happening?',
  openGraph: {
    title: 'Are You Actually Connected?',
    description: 'UK data and statistics on are you actually connected?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/broadband',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are You Actually Connected?',
    description: 'UK data and statistics on are you actually connected?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/broadband',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
