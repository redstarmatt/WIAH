import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does Your Vote Actually Matter?',
  description: 'UK data and statistics on does your vote actually matter?. What is actually happening?',
  openGraph: {
    title: 'Does Your Vote Actually Matter?',
    description: 'UK data and statistics on does your vote actually matter?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/democracy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does Your Vote Actually Matter?',
    description: 'UK data and statistics on does your vote actually matter?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/democracy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
