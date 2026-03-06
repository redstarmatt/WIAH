import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is smoking actually disappearing?',
  description: 'Adult smoking rates have halved in 13 years — from 1 in 5 adults in 2011 to just 1 in 10 in 2024. Among 18–24 year olds, rates have collapsed from 1 in 4 to fewer than 1 in 12 in a single generation.',
  openGraph: {
    title: 'Is smoking actually disappearing?',
    description: 'Adult smoking rates have halved in 13 years — from 1 in 5 adults in 2011 to just 1 in 10 in 2024. Among 18–24 year olds, rates have collapsed from 1 in 4 to fewer than 1 in 12 in a single generation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/smoking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is smoking actually disappearing?',
    description: 'Adult smoking rates have halved in 13 years — from 1 in 5 adults in 2011 to just 1 in 10 in 2024. Among 18–24 year olds, rates have collapsed from 1 in 4 to fewer than 1 in 12 in a single generation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/smoking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
