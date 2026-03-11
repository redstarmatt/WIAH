import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Inflation Hitting the Poorest Hardest?",
  description: "Low-income households face 2\u20133 percentage points more inflation than wealthy households. The ONS Household Costs Indices reveal a persistent inflation inequality driven by food and energy spending.",
  openGraph: {
    title: "Is Inflation Hitting the Poorest Hardest?",
    description: "Low-income households face 2\u20133 percentage points more inflation than wealthy households. The ONS Household Costs Indices reveal a persistent inflation inequality driven by food and energy spending.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/household-inflation",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Inflation Hitting the Poorest Hardest?",
    description: "Low-income households face 2\u20133 percentage points more inflation than wealthy households. The ONS Household Costs Indices reveal a persistent inflation inequality driven by food and energy spending.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/household-inflation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
