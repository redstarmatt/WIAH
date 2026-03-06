import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Homes Actually Getting More Efficient?',
  description: 'Only 49&percnt; of English homes have an EPC rating of C or above, against a target of 100&percnt; by 2035. Heat pump installations reached 72,000 in 2024 &mdash; less than 12&percnt; of the 600,000 per year needed to meet net zero targets.',
  openGraph: {
    title: 'Are Britain&apos;s Homes Actually Getting More Efficient?',
    description: 'Only 49&percnt; of English homes have an EPC rating of C or above, against a target of 100&percnt; by 2035. Heat pump installations reached 72,000 in 2024 &mdash; less than 12&percnt; of the 600,000 per year needed to meet net zero targets.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/energy-efficiency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Homes Actually Getting More Efficient?',
    description: 'Only 49&percnt; of English homes have an EPC rating of C or above, against a target of 100&percnt; by 2035. Heat pump installations reached 72,000 in 2024 &mdash; less than 12&percnt; of the 600,000 per year needed to meet net zero targets.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/energy-efficiency',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
