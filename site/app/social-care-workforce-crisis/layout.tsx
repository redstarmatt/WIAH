import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are There Enough Social Care Workers?',
  description: 'The social care sector has 152,000 vacancies &mdash; a 9.9% vacancy rate that leaves vulnerable people without the support they need.',
  openGraph: {
    title: 'Are There Enough Social Care Workers?',
    description: 'The social care sector has 152,000 vacancies &mdash; a 9.9% vacancy rate that leaves vulnerable people without the support they need.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-care-workforce-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are There Enough Social Care Workers?',
    description: 'The social care sector has 152,000 vacancies &mdash; a 9.9% vacancy rate that leaves vulnerable people without the support they need.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-care-workforce-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
