import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Have Food Prices Actually Gone Up?',
  description: 'Food and non-alcoholic drink prices rose 19.2&percnt; in the year to March 2023 &mdash; the highest rate in 45 years &mdash; adding approximately &pound;700 to average household food bills.',
  openGraph: {
    title: 'How Much Have Food Prices Actually Gone Up?',
    description: 'Food and non-alcoholic drink prices rose 19.2&percnt; in the year to March 2023 &mdash; the highest rate in 45 years &mdash; adding approximately &pound;700 to average household food bills.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-inflation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Have Food Prices Actually Gone Up?',
    description: 'Food and non-alcoholic drink prices rose 19.2&percnt; in the year to March 2023 &mdash; the highest rate in 45 years &mdash; adding approximately &pound;700 to average household food bills.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-inflation',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
