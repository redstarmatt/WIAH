import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Britain Sell to the World?',
  description: 'UK services exports hit a record £400 billion in 2023, compensating for weak goods exports — but the trade deficit remains stubborn.',
  openGraph: {
    title: 'Can Britain Sell to the World?',
    description: 'UK services exports hit a record £400 billion in 2023, compensating for weak goods exports — but the trade deficit remains stubborn.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/export-goods-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Britain Sell to the World?',
    description: 'UK services exports hit a record £400 billion in 2023, compensating for weak goods exports — but the trade deficit remains stubborn.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/export-goods-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
