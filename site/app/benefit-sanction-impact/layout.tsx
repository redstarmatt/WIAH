import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When Benefits Are Stopped?',
  description: '786,000 Universal Credit sanctions were applied in 2023 &mdash; and research shows sanctions increase food bank referrals and destitution without improving employment.',
  openGraph: {
    title: 'What Happens When Benefits Are Stopped?',
    description: '786,000 Universal Credit sanctions were applied in 2023 &mdash; and research shows sanctions increase food bank referrals and destitution without improving employment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/benefit-sanction-impact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When Benefits Are Stopped?',
    description: '786,000 Universal Credit sanctions were applied in 2023 &mdash; and research shows sanctions increase food bank referrals and destitution without improving employment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/benefit-sanction-impact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
