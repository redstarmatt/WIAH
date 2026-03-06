import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the NHS Actually Running Out of Staff?',
  description: 'UK data and statistics on is the nhs actually running out of staff?. What is actually happening?',
  openGraph: {
    title: 'Is the NHS Actually Running Out of Staff?',
    description: 'UK data and statistics on is the nhs actually running out of staff?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-staffing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the NHS Actually Running Out of Staff?',
    description: 'UK data and statistics on is the nhs actually running out of staff?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-staffing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
