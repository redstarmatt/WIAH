import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Are the Hidden Costs of Driving?`,
  description: 'City centre day parking now averages £24, and councils collected £1.8bn in parking revenue in 2024. 285 towns have removed free parking since 2015, affecting town centre footfall.',
  openGraph: {
    title: `What Are the Hidden Costs of Driving?`,
    description: 'City centre day parking now averages £24, and councils collected £1.8bn in parking revenue in 2024. 285 towns have removed free parking since 2015, affecting town centre footfall.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/parking-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Are the Hidden Costs of Driving?`,
    description: 'City centre day parking now averages £24, and councils collected £1.8bn in parking revenue in 2024. 285 towns have removed free parking since 2015, affecting town centre footfall.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/parking-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
