import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'What is actually happening? is a curated national data platform making the real state of the UK visible, understandable, and shareable — with every number sourced and dated.',
  openGraph: {
    title: 'About | What is actually happening?',
    description: 'A curated national data platform making the real state of the UK visible, understandable, and shareable.',
    type: 'website',
    url: 'https://whatisactuallyhappening.uk/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | What is actually happening?',
    description: 'A curated national data platform making the real state of the UK visible, understandable, and shareable.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
