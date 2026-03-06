import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Get Around?',
  description: 'UK data and statistics on can you actually get around?. What is actually happening?',
  openGraph: {
    title: 'Can You Actually Get Around?',
    description: 'UK data and statistics on can you actually get around?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/transport',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Get Around?',
    description: 'UK data and statistics on can you actually get around?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/transport',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
