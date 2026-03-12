import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When Someone Dies Unexpectedly?',
  description: 'Average time from death to inquest conclusion has tripled from 20 weeks in 2014 to 57 weeks in 2024. Over 30,000 inquests are opened annually in England and Wales, but coroner capacity has not kept pace.',
  openGraph: {
    title: 'What Happens When Someone Dies Unexpectedly?',
    description: 'Average time from death to inquest conclusion has tripled from 20 weeks in 2014 to 57 weeks in 2024. Over 30,000 inquests are opened annually in England and Wales, but coroner capacity has not kept pace.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/inquest-delays',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When Someone Dies Unexpectedly?',
    description: 'Average time from death to inquest conclusion has tripled from 20 weeks in 2014 to 57 weeks in 2024. Over 30,000 inquests are opened annually in England and Wales, but coroner capacity has not kept pace.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/inquest-delays',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
