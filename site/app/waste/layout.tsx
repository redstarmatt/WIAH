import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does Your Recycling Actually Get Recycled?',
  description: 'UK data and statistics on does your recycling actually get recycled?. What is actually happening?',
  openGraph: {
    title: 'Does Your Recycling Actually Get Recycled?',
    description: 'UK data and statistics on does your recycling actually get recycled?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/waste',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does Your Recycling Actually Get Recycled?',
    description: 'UK data and statistics on does your recycling actually get recycled?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/waste',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
