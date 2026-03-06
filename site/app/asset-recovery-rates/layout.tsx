import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much of criminal proceeds is actually recovered?',
  description: 'The UK recovers around £378 million annually from criminal proceeds, against an estimated £12 billion laundered each year.',
  openGraph: {
    title: 'How much of criminal proceeds is actually recovered?',
    description: 'The UK recovers around £378 million annually from criminal proceeds, against an estimated £12 billion laundered each year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/asset-recovery-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much of criminal proceeds is actually recovered?',
    description: 'The UK recovers around £378 million annually from criminal proceeds, against an estimated £12 billion laundered each year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/asset-recovery-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
