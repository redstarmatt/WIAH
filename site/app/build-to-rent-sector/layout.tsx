import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Building the Homes of the Future?',
  description: 'The build-to-rent sector has grown to 97,000 units with 250,000 in the pipeline &mdash; but average rents run 7% above comparable market-rate properties.',
  openGraph: {
    title: 'Who Is Building the Homes of the Future?',
    description: 'The build-to-rent sector has grown to 97,000 units with 250,000 in the pipeline &mdash; but average rents run 7% above comparable market-rate properties.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/build-to-rent-sector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Building the Homes of the Future?',
    description: 'The build-to-rent sector has grown to 97,000 units with 250,000 in the pipeline &mdash; but average rents run 7% above comparable market-rate properties.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/build-to-rent-sector',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
