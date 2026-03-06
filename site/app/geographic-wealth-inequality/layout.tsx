import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Unequal Is Wealth Across Britain?',
  description: 'Households in South East England are on average three times wealthier than households in the North East — a gap that has widened since the financial crisis.',
  openGraph: {
    title: 'How Unequal Is Wealth Across Britain?',
    description: 'Households in South East England are on average three times wealthier than households in the North East — a gap that has widened since the financial crisis.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/geographic-wealth-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Unequal Is Wealth Across Britain?',
    description: 'Households in South East England are on average three times wealthier than households in the North East — a gap that has widened since the financial crisis.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/geographic-wealth-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
