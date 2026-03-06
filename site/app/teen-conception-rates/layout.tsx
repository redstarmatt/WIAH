import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Teenage Pregnancy Still a Problem?',
  description: 'Under-18 conception rates have fallen to a record low of 13 per 1,000 — one of the greatest public health successes of the past 25 years.',
  openGraph: {
    title: 'Is Teenage Pregnancy Still a Problem?',
    description: 'Under-18 conception rates have fallen to a record low of 13 per 1,000 — one of the greatest public health successes of the past 25 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/teen-conception-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Teenage Pregnancy Still a Problem?',
    description: 'Under-18 conception rates have fallen to a record low of 13 per 1,000 — one of the greatest public health successes of the past 25 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/teen-conception-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
