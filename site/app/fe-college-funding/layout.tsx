import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Further Education Colleges Being Starved of Cash?',
  description: 'Funding per further education student has fallen 28% in real terms since 2010 &mdash; and 22% of colleges are in financial difficulty.',
  openGraph: {
    title: 'Are Further Education Colleges Being Starved of Cash?',
    description: 'Funding per further education student has fallen 28% in real terms since 2010 &mdash; and 22% of colleges are in financial difficulty.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fe-college-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Further Education Colleges Being Starved of Cash?',
    description: 'Funding per further education student has fallen 28% in real terms since 2010 &mdash; and 22% of colleges are in financial difficulty.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fe-college-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
