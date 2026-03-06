import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Childcare Stopping Parents From Working?',
  description: 'UK full-time childcare for a child under two now costs £14,000 per year — more than a mortgage — and 1 in 3 parents has reduced work hours or left employment because of costs.',
  openGraph: {
    title: 'Is Childcare Stopping Parents From Working?',
    description: 'UK full-time childcare for a child under two now costs £14,000 per year — more than a mortgage — and 1 in 3 parents has reduced work hours or left employment because of costs.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/childcare-cost-barrier',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Childcare Stopping Parents From Working?',
    description: 'UK full-time childcare for a child under two now costs £14,000 per year — more than a mortgage — and 1 in 3 parents has reduced work hours or left employment because of costs.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/childcare-cost-barrier',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
