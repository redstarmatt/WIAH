import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Broken Is Britain&apos;s Asylum System?',
  description: '98,519 asylum applications were made in the UK in 2023 &mdash; a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is 26 months. The UK spends &pound;4 billion a year housing asylum seekers in hotels, costing &pound;150 per person per night. Just 44% of decisions grant asylum.',
  openGraph: {
    title: 'How Broken Is Britain&apos;s Asylum System?',
    description: '98,519 asylum applications were made in the UK in 2023 &mdash; a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is 26 months. The UK spends &pound;4 billion a year housing asylum seekers in hotels, costing &pound;150 per person per night. Just 44% of decisions grant asylum.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/asylum-system',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Broken Is Britain&apos;s Asylum System?',
    description: '98,519 asylum applications were made in the UK in 2023 &mdash; a post-war record. Over 220,000 people were awaiting an initial decision at year end. The average wait is 26 months. The UK spends &pound;4 billion a year housing asylum seekers in hotels, costing &pound;150 per person per night. Just 44% of decisions grant asylum.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/asylum-system',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
