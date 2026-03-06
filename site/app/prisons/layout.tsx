import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the British Prison System Actually Working?',
  description: 'The prison population in England and Wales reached 88,000 in 2024 &mdash; the highest ever, above operational capacity. Reoffending within 12 months: 26%. Assaults are at record levels. The government released 5,500 prisoners early in 2024 to prevent system collapse.',
  openGraph: {
    title: 'Is the British Prison System Actually Working?',
    description: 'The prison population in England and Wales reached 88,000 in 2024 &mdash; the highest ever, above operational capacity. Reoffending within 12 months: 26%. Assaults are at record levels. The government released 5,500 prisoners early in 2024 to prevent system collapse.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prisons',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the British Prison System Actually Working?',
    description: 'The prison population in England and Wales reached 88,000 in 2024 &mdash; the highest ever, above operational capacity. Reoffending within 12 months: 26%. Assaults are at record levels. The government released 5,500 prisoners early in 2024 to prevent system collapse.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prisons',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
