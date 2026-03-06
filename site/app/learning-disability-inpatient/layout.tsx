import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why are people with learning disabilities still in long-stay hospitals?',
  description: 'Over 2,000 people with learning disabilities and autism remain in inpatient psychiatric facilities, many for years at a time.',
  openGraph: {
    title: 'Why are people with learning disabilities still in long-stay hospitals?',
    description: 'Over 2,000 people with learning disabilities and autism remain in inpatient psychiatric facilities, many for years at a time.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/learning-disability-inpatient',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why are people with learning disabilities still in long-stay hospitals?',
    description: 'Over 2,000 people with learning disabilities and autism remain in inpatient psychiatric facilities, many for years at a time.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/learning-disability-inpatient',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
