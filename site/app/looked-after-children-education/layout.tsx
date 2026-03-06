import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Are Children in Care Faring in School?',
  description: 'Only 14% of looked-after children achieve expected GCSE standards, compared to 48% of all pupils, and 1 in 3 changes school mid-year.',
  openGraph: {
    title: 'How Are Children in Care Faring in School?',
    description: 'Only 14% of looked-after children achieve expected GCSE standards, compared to 48% of all pupils, and 1 in 3 changes school mid-year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/looked-after-children-education',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Are Children in Care Faring in School?',
    description: 'Only 14% of looked-after children achieve expected GCSE standards, compared to 48% of all pupils, and 1 in 3 changes school mid-year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/looked-after-children-education',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
