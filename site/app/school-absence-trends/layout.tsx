import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Children Not Going to School?',
  description: 'One in five children missed more than 10% of school in 2022/23 &mdash; a persistent absence rate that has more than doubled since before the pandemic.',
  openGraph: {
    title: 'Why Are Children Not Going to School?',
    description: 'One in five children missed more than 10% of school in 2022/23 &mdash; a persistent absence rate that has more than doubled since before the pandemic.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-absence-trends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Children Not Going to School?',
    description: 'One in five children missed more than 10% of school in 2022/23 &mdash; a persistent absence rate that has more than doubled since before the pandemic.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-absence-trends',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
