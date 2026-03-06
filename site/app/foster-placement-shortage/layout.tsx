import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are There Enough Foster Carers?',
  description: 'England needs 8,700 more foster carers — meaning one in three children who needs fostering cannot be placed locally, often entering costly residential care instead.',
  openGraph: {
    title: 'Are There Enough Foster Carers?',
    description: 'England needs 8,700 more foster carers — meaning one in three children who needs fostering cannot be placed locally, often entering costly residential care instead.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/foster-placement-shortage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are There Enough Foster Carers?',
    description: 'England needs 8,700 more foster carers — meaning one in three children who needs fostering cannot be placed locally, often entering costly residential care instead.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/foster-placement-shortage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
