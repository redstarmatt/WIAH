import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Anti-Social Behaviour Out of Control?',
  description: '1.6 million anti-social behaviour incidents were recorded in 2023 &mdash; and fewer than 1 in 3 receive a police response within an hour.',
  openGraph: {
    title: 'Is Anti-Social Behaviour Out of Control?',
    description: '1.6 million anti-social behaviour incidents were recorded in 2023 &mdash; and fewer than 1 in 3 receive a police response within an hour.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/anti-social-behaviour-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Anti-Social Behaviour Out of Control?',
    description: '1.6 million anti-social behaviour incidents were recorded in 2023 &mdash; and fewer than 1 in 3 receive a police response within an hour.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/anti-social-behaviour-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
