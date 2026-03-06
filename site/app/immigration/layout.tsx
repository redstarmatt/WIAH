import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Actually Happening with UK Immigration?',
  description: 'Net migration to the UK reached a record 745,000 in the year to December 2022 &mdash; nearly three times pre-Brexit levels. It fell to an estimated 685,000 in 2023. Work visas are the largest category, followed by study. The asylum backlog reached 133,000 in 2023, though it has been cut substantially. Emigration has also risen.',
  openGraph: {
    title: 'What Is Actually Happening with UK Immigration?',
    description: 'Net migration to the UK reached a record 745,000 in the year to December 2022 &mdash; nearly three times pre-Brexit levels. It fell to an estimated 685,000 in 2023. Work visas are the largest category, followed by study. The asylum backlog reached 133,000 in 2023, though it has been cut substantially. Emigration has also risen.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/immigration',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Actually Happening with UK Immigration?',
    description: 'Net migration to the UK reached a record 745,000 in the year to December 2022 &mdash; nearly three times pre-Brexit levels. It fell to an estimated 685,000 in 2023. Work visas are the largest category, followed by study. The asylum backlog reached 133,000 in 2023, though it has been cut substantially. Emigration has also risen.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/immigration',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
