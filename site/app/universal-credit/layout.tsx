import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Universal Credit actually working?',
  description: 'Universal Credit now supports 6.4 million households, but its five-week wait, two-child limit, and benefit cap mean that for many of the most vulnerable claimants, the safety net has significant holes.',
  openGraph: {
    title: 'Is Universal Credit actually working?',
    description: 'Universal Credit now supports 6.4 million households, but its five-week wait, two-child limit, and benefit cap mean that for many of the most vulnerable claimants, the safety net has significant holes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/universal-credit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Universal Credit actually working?',
    description: 'Universal Credit now supports 6.4 million households, but its five-week wait, two-child limit, and benefit cap mean that for many of the most vulnerable claimants, the safety net has significant holes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/universal-credit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
