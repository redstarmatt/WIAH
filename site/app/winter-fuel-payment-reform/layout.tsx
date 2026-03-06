import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Has Lost the Winter Fuel Payment?',
  description: '10 million pensioners lost the Winter Fuel Payment in 2024 when the government means-tested it — and projections suggest 200,000 more pensioners will fall into poverty.',
  openGraph: {
    title: 'Who Has Lost the Winter Fuel Payment?',
    description: '10 million pensioners lost the Winter Fuel Payment in 2024 when the government means-tested it — and projections suggest 200,000 more pensioners will fall into poverty.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/winter-fuel-payment-reform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Has Lost the Winter Fuel Payment?',
    description: '10 million pensioners lost the Winter Fuel Payment in 2024 when the government means-tested it — and projections suggest 200,000 more pensioners will fall into poverty.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/winter-fuel-payment-reform',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
