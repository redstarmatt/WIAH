import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much do people caring for your relatives actually earn?',
  description: 'The median care worker earns &pound;10.66 an hour &mdash; below the Real Living Wage of &pound;12.00 and far below comparable NHS roles. There are 152,000 vacancies in adult social care, and annual turnover is 28% &mdash; meaning a new workforce every 3&ndash;4 years.',
  openGraph: {
    title: 'How much do people caring for your relatives actually earn?',
    description: 'The median care worker earns &pound;10.66 an hour &mdash; below the Real Living Wage of &pound;12.00 and far below comparable NHS roles. There are 152,000 vacancies in adult social care, and annual turnover is 28% &mdash; meaning a new workforce every 3&ndash;4 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-worker-wages',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much do people caring for your relatives actually earn?',
    description: 'The median care worker earns &pound;10.66 an hour &mdash; below the Real Living Wage of &pound;12.00 and far below comparable NHS roles. There are 152,000 vacancies in adult social care, and annual turnover is 28% &mdash; meaning a new workforce every 3&ndash;4 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-worker-wages',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
