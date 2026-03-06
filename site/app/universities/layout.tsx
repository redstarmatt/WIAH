import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is University Actually Worth It?',
  description: 'UK data and statistics on is university actually worth it?. What is actually happening?',
  openGraph: {
    title: 'Is University Actually Worth It?',
    description: 'UK data and statistics on is university actually worth it?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/universities',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is University Actually Worth It?',
    description: 'UK data and statistics on is university actually worth it?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/universities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
