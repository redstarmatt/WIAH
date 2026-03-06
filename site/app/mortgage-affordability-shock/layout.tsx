import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can People Afford Their Mortgages?',
  description: 'Mortgage payments for new buyers now consume 41% of take-home pay &mdash; and 800,000 households face payment shocks averaging &pound;300 more per month.',
  openGraph: {
    title: 'Can People Afford Their Mortgages?',
    description: 'Mortgage payments for new buyers now consume 41% of take-home pay &mdash; and 800,000 households face payment shocks averaging &pound;300 more per month.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/mortgage-affordability-shock',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can People Afford Their Mortgages?',
    description: 'Mortgage payments for new buyers now consume 41% of take-home pay &mdash; and 800,000 households face payment shocks averaging &pound;300 more per month.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/mortgage-affordability-shock',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
