import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Your Water Actually Clean?',
  description: 'Water companies discharged sewage for 3.6 million hours last year. Only 16% of England's rivers are in good ecological health. UK data on sewage, water quality, and bathing water.',
  openGraph: {
    title: 'Is Your Water Actually Clean?',
    description: 'Water companies discharged sewage for 3.6 million hours last year. Only 16% of England's rivers are in good ecological health. UK data on sewage, water quality, and bathing water.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Water Actually Clean?',
    description: 'Water companies discharged sewage for 3.6 million hours last year. Only 16% of England's rivers are in good ecological health. UK data on sewage, water quality, and bathing water.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
