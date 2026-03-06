import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Building a Walking and Cycling Nation?',
  description: 'Active Travel England investment reached £1.1 billion in 2023, but cycling represents just 2.4% of trips — well below comparable European countries.',
  openGraph: {
    title: 'Is Britain Building a Walking and Cycling Nation?',
    description: 'Active Travel England investment reached £1.1 billion in 2023, but cycling represents just 2.4% of trips — well below comparable European countries.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/active-travel-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Building a Walking and Cycling Nation?',
    description: 'Active Travel England investment reached £1.1 billion in 2023, but cycling represents just 2.4% of trips — well below comparable European countries.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/active-travel-investment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
