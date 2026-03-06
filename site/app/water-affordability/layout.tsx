import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Everyone Afford Their Water Bills?',
  description: `Average water bills have risen to £448 a year, and 22% of households are in 'water poverty' — spending more than 3% of their income on water.`,
  openGraph: {
    title: 'Can Everyone Afford Their Water Bills?',
    description: `Average water bills have risen to £448 a year, and 22% of households are in 'water poverty' — spending more than 3% of their income on water.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water-affordability',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Everyone Afford Their Water Bills?',
    description: `Average water bills have risen to £448 a year, and 22% of households are in 'water poverty' — spending more than 3% of their income on water.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water-affordability',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
