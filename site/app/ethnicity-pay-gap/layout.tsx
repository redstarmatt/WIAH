import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Ethnic Minority Workers Paid Less?',
  description: 'Workers from Bangladeshi and Pakistani backgrounds earn over 20% less than their White British peers — a gap that has barely narrowed in a decade.',
  openGraph: {
    title: 'Are Ethnic Minority Workers Paid Less?',
    description: 'Workers from Bangladeshi and Pakistani backgrounds earn over 20% less than their White British peers — a gap that has barely narrowed in a decade.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/ethnicity-pay-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Ethnic Minority Workers Paid Less?',
    description: 'Workers from Bangladeshi and Pakistani backgrounds earn over 20% less than their White British peers — a gap that has barely narrowed in a decade.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/ethnicity-pay-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
