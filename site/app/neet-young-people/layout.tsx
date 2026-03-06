import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Young People Are Going Nowhere?',
  description: '857,000 young people aged 16–24 are not in education, employment or training — nearly 1 in 8 of their age group.',
  openGraph: {
    title: 'How Many Young People Are Going Nowhere?',
    description: '857,000 young people aged 16–24 are not in education, employment or training — nearly 1 in 8 of their age group.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/neet-young-people',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Young People Are Going Nowhere?',
    description: '857,000 young people aged 16–24 are not in education, employment or training — nearly 1 in 8 of their age group.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/neet-young-people',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
