import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Young People Are Harmed by Gambling?',
  description: 'An estimated 55,000 children aged 11-16 are classified as problem gamblers, with online gambling increasingly accessible.',
  openGraph: {
    title: 'How Many Young People Are Harmed by Gambling?',
    description: 'An estimated 55,000 children aged 11-16 are classified as problem gamblers, with online gambling increasingly accessible.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/compulsive-gambling-youth',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Young People Are Harmed by Gambling?',
    description: 'An estimated 55,000 children aged 11-16 are classified as problem gamblers, with online gambling increasingly accessible.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/compulsive-gambling-youth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
