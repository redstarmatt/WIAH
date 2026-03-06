import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Households Are Drowning in Debt?',
  description: "UK households owe £1.9 trillion in total debt — 130% of household income. 8.9 million people are in 'problem debt' (StepChange). Personal insolvencies rose to 110,000 in 2023 — the highest since 2010. Energy debt reached £3.1 billion in 2023 as the cost-of-living crisis pushed millions beyond their means.",
  openGraph: {
    title: 'How Many Households Are Drowning in Debt?',
    description: "UK households owe £1.9 trillion in total debt — 130% of household income. 8.9 million people are in 'problem debt' (StepChange). Personal insolvencies rose to 110,000 in 2023 — the highest since 2010. Energy debt reached £3.1 billion in 2023 as the cost-of-living crisis pushed millions beyond their means.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/personal-debt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Households Are Drowning in Debt?',
    description: "UK households owe £1.9 trillion in total debt — 130% of household income. 8.9 million people are in 'problem debt' (StepChange). Personal insolvencies rose to 110,000 in 2023 — the highest since 2010. Energy debt reached £3.1 billion in 2023 as the cost-of-living crisis pushed millions beyond their means.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/personal-debt',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
