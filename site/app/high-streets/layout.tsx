import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your High Street Actually Dying?',
  description: 'High street retail vacancy has reached 14%, the highest in over a decade. Store closures continue to outpace openings, while e-commerce has permanently taken 27% of all retail spending.',
  openGraph: {
    title: 'Is Your High Street Actually Dying?',
    description: 'High street retail vacancy has reached 14%, the highest in over a decade. Store closures continue to outpace openings, while e-commerce has permanently taken 27% of all retail spending.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/high-streets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your High Street Actually Dying?',
    description: 'High street retail vacancy has reached 14%, the highest in over a decade. Store closures continue to outpace openings, while e-commerce has permanently taken 27% of all retail spending.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/high-streets',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
