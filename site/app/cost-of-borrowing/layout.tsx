import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `What Have High Interest Rates Done to Households?`,
  description: 'Average mortgage payments rose 61% between 2021 and 2024. The shock of moving from 2.3% to nearly 5% rates added £580 per month to typical housing costs for 1.8 million remortgaging households.',
  openGraph: {
    title: `What Have High Interest Rates Done to Households?`,
    description: 'Average mortgage payments rose 61% between 2021 and 2024. The shock of moving from 2.3% to nearly 5% rates added £580 per month to typical housing costs for 1.8 million remortgaging households.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cost-of-borrowing',
  },
  twitter: {
    card: 'summary_large_image',
    title: `What Have High Interest Rates Done to Households?`,
    description: 'Average mortgage payments rose 61% between 2021 and 2024. The shock of moving from 2.3% to nearly 5% rates added £580 per month to typical housing costs for 1.8 million remortgaging households.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cost-of-borrowing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
