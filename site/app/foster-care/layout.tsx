import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where Do the Children Go?',
  description: 'England has lost over 5,000 foster carer households since 2015 &mdash; an 11&percnt; decline &mdash; while the number of children needing placements has risen. One in eight looked-after children now experiences three or more placement moves in a single year, and councils are spending &pound;1.6 billion annually on agency placements at two to three times the cost of in-house foster care.',
  openGraph: {
    title: 'Where Do the Children Go?',
    description: 'England has lost over 5,000 foster carer households since 2015 &mdash; an 11&percnt; decline &mdash; while the number of children needing placements has risen. One in eight looked-after children now experiences three or more placement moves in a single year, and councils are spending &pound;1.6 billion annually on agency placements at two to three times the cost of in-house foster care.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/foster-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Do the Children Go?',
    description: 'England has lost over 5,000 foster carer households since 2015 &mdash; an 11&percnt; decline &mdash; while the number of children needing placements has risen. One in eight looked-after children now experiences three or more placement moves in a single year, and councils are spending &pound;1.6 billion annually on agency placements at two to three times the cost of in-house foster care.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/foster-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
