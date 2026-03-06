import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Don&rsquo;t More Fathers Take Parental Leave?',
  description: 'Only 3.6% of eligible fathers take shared parental leave &mdash; largely because statutory pay at &pound;184 per week makes it financially impossible for most families.',
  openGraph: {
    title: 'Why Don&rsquo;t More Fathers Take Parental Leave?',
    description: 'Only 3.6% of eligible fathers take shared parental leave &mdash; largely because statutory pay at &pound;184 per week makes it financially impossible for most families.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/shared-parental-leave',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Don&rsquo;t More Fathers Take Parental Leave?',
    description: 'Only 3.6% of eligible fathers take shared parental leave &mdash; largely because statutory pay at &pound;184 per week makes it financially impossible for most families.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/shared-parental-leave',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
