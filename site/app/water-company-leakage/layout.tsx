import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Water Are the Companies Leaking?",
  description: "England and Wales loses 3,060 million litres of water per day to leakage — above the regulator's 2020 target of 2,800 million litres. Only 43% of water companies are meeting their own leakage reduction targets.",
  openGraph: {
    title: "How Much Water Are the Companies Leaking?",
    description: "England and Wales loses 3,060 million litres of water per day to leakage — above the regulator's 2020 target of 2,800 million litres. Only 43% of water companies are meeting their own leakage reduction targets.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water-company-leakage',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Water Are the Companies Leaking?",
    description: "England and Wales loses 3,060 million litres of water per day to leakage — above the regulator's 2020 target of 2,800 million litres. Only 43% of water companies are meeting their own leakage reduction targets.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water-company-leakage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
