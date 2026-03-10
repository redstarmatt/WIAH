import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Unequal Is British Wealth?",
  description: "The top 10% of UK households own 57% of all wealth; the bottom 50% own just 4%. The financial wealth Gini of 0.87 is near maximum inequality.",
  openGraph: {
    title: "How Unequal Is British Wealth?",
    description: "The top 10% of UK households own 57% of all wealth; the bottom 50% own just 4%. The financial wealth Gini of 0.87 is near maximum inequality.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/wealth-gini",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Unequal Is British Wealth?",
    description: "The top 10% of UK households own 57% of all wealth; the bottom 50% own just 4%. The financial wealth Gini of 0.87 is near maximum inequality.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/wealth-gini",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
