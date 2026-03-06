import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Are We Actually Doing to the Planet?',
  description: 'UK data and statistics on what are we actually doing to the planet?. What is actually happening?',
  openGraph: {
    title: 'What Are We Actually Doing to the Planet?',
    description: 'UK data and statistics on what are we actually doing to the planet?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/environment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Are We Actually Doing to the Planet?',
    description: 'UK data and statistics on what are we actually doing to the planet?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/environment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
