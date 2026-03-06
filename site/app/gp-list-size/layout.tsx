import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are GPs Overwhelmed by Patient Numbers?',
  description: 'The average GP now looks after 2,271 patients &mdash; and in some practices, a single doctor covers over 4,000.',
  openGraph: {
    title: 'Are GPs Overwhelmed by Patient Numbers?',
    description: 'The average GP now looks after 2,271 patients &mdash; and in some practices, a single doctor covers over 4,000.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gp-list-size',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are GPs Overwhelmed by Patient Numbers?',
    description: 'The average GP now looks after 2,271 patients &mdash; and in some practices, a single doctor covers over 4,000.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gp-list-size',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
