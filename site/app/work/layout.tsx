import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your Job Actually Getting Better?',
  description: 'UK data and statistics on is your job actually getting better?. What is actually happening?',
  openGraph: {
    title: 'Is Your Job Actually Getting Better?',
    description: 'UK data and statistics on is your job actually getting better?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Job Actually Getting Better?',
    description: 'UK data and statistics on is your job actually getting better?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/work',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
