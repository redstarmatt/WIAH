import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Schools Equipped to Support Children's Mental Health?`,
  description: 'Only 1 in 3 schools has a mental health lead, and 75% of young people with mental health problems wait more than a year before receiving help.',
  openGraph: {
    title: `Are Schools Equipped to Support Children's Mental Health?`,
    description: 'Only 1 in 3 schools has a mental health lead, and 75% of young people with mental health problems wait more than a year before receiving help.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-mental-health-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Schools Equipped to Support Children's Mental Health?`,
    description: 'Only 1 in 3 schools has a mental health lead, and 75% of young people with mental health problems wait more than a year before receiving help.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-mental-health-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
