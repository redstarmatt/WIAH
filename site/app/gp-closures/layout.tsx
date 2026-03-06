import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many GP practices have closed?',
  description: '1,640 GP practices have closed since 2013. Average practice list sizes have grown from 6,900 to 9,600 patients &mdash; creating larger, less personal surgeries where continuity of care is harder.',
  openGraph: {
    title: 'How many GP practices have closed?',
    description: '1,640 GP practices have closed since 2013. Average practice list sizes have grown from 6,900 to 9,600 patients &mdash; creating larger, less personal surgeries where continuity of care is harder.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gp-closures',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many GP practices have closed?',
    description: '1,640 GP practices have closed since 2013. Average practice list sizes have grown from 6,900 to 9,600 patients &mdash; creating larger, less personal surgeries where continuity of care is harder.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gp-closures',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
