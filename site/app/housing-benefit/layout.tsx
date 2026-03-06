import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Housing Benefit Keeping Pace With Rents?',
  description: 'The Local Housing Allowance was frozen for four years until 2024, leaving recipients facing an average gap of £190 per month between benefit and actual rent — pushing 186,000 households to the brink of eviction.',
  openGraph: {
    title: 'Is Housing Benefit Keeping Pace With Rents?',
    description: 'The Local Housing Allowance was frozen for four years until 2024, leaving recipients facing an average gap of £190 per month between benefit and actual rent — pushing 186,000 households to the brink of eviction.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing-benefit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Housing Benefit Keeping Pace With Rents?',
    description: 'The Local Housing Allowance was frozen for four years until 2024, leaving recipients facing an average gap of £190 per month between benefit and actual rent — pushing 186,000 households to the brink of eviction.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing-benefit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
