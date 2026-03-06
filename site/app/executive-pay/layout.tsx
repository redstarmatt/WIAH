import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much More Are Bosses Paid Than Workers?',
  description: 'FTSE 100 CEOs earn on average &pound;3.9 million per year &mdash; 118 times the median UK full-time worker salary &mdash; a ratio that has more than doubled since 2000.',
  openGraph: {
    title: 'How Much More Are Bosses Paid Than Workers?',
    description: 'FTSE 100 CEOs earn on average &pound;3.9 million per year &mdash; 118 times the median UK full-time worker salary &mdash; a ratio that has more than doubled since 2000.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/executive-pay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much More Are Bosses Paid Than Workers?',
    description: 'FTSE 100 CEOs earn on average &pound;3.9 million per year &mdash; 118 times the median UK full-time worker salary &mdash; a ratio that has more than doubled since 2000.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/executive-pay',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
