import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are 700,000 Homes Sitting Empty in a Housing Crisis?',
  description: 'England has approximately 700,000 empty properties &mdash; enough to house every person on a local authority waiting list. Long-term vacancies have risen every year since 2016 while 1.3 million households wait for social housing. Council tax premiums on empty homes remain weakly enforced and unevenly applied.',
  openGraph: {
    title: 'Why Are 700,000 Homes Sitting Empty in a Housing Crisis?',
    description: 'England has approximately 700,000 empty properties &mdash; enough to house every person on a local authority waiting list. Long-term vacancies have risen every year since 2016 while 1.3 million households wait for social housing. Council tax premiums on empty homes remain weakly enforced and unevenly applied.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/empty-homes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are 700,000 Homes Sitting Empty in a Housing Crisis?',
    description: 'England has approximately 700,000 empty properties &mdash; enough to house every person on a local authority waiting list. Long-term vacancies have risen every year since 2016 while 1.3 million households wait for social housing. Council tax premiums on empty homes remain weakly enforced and unevenly applied.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/empty-homes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
