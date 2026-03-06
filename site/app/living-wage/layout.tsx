import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Workers Are Still Paid Below a Living Wage?',
  description: 'Despite the National Living Wage rising to &pound;11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of &pound;12.60/hr &mdash; the independently calculated rate for actual living costs.',
  openGraph: {
    title: 'How Many Workers Are Still Paid Below a Living Wage?',
    description: 'Despite the National Living Wage rising to &pound;11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of &pound;12.60/hr &mdash; the independently calculated rate for actual living costs.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/living-wage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Workers Are Still Paid Below a Living Wage?',
    description: 'Despite the National Living Wage rising to &pound;11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of &pound;12.60/hr &mdash; the independently calculated rate for actual living costs.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/living-wage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
