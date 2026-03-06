import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are 2.8 Million More People Out of Work Since COVID?',
  description: 'UK data and statistics on why are 2.8 million more people out of work since covid?. What is actually happening?',
  openGraph: {
    title: 'Why Are 2.8 Million More People Out of Work Since COVID?',
    description: 'UK data and statistics on why are 2.8 million more people out of work since covid?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/economic-inactivity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are 2.8 Million More People Out of Work Since COVID?',
    description: 'UK data and statistics on why are 2.8 million more people out of work since covid?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/economic-inactivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
