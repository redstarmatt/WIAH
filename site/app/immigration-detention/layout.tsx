import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How long are people held in immigration detention?',
  description: 'On any given day, around 2,900 people are held in immigration detention in the UK, with no legal time limit on how long they can be held.',
  openGraph: {
    title: 'How long are people held in immigration detention?',
    description: 'On any given day, around 2,900 people are held in immigration detention in the UK, with no legal time limit on how long they can be held.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/immigration-detention',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How long are people held in immigration detention?',
    description: 'On any given day, around 2,900 people are held in immigration detention in the UK, with no legal time limit on how long they can be held.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/immigration-detention',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
