import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are UK Businesses Investing Enough?',
  description: 'UK business investment as a share of GDP remains among the lowest in the G7, constraining productivity growth.',
  openGraph: {
    title: 'Are UK Businesses Investing Enough?',
    description: 'UK business investment as a share of GDP remains among the lowest in the G7, constraining productivity growth.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/business-investment-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are UK Businesses Investing Enough?',
    description: 'UK business investment as a share of GDP remains among the lowest in the G7, constraining productivity growth.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/business-investment-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
