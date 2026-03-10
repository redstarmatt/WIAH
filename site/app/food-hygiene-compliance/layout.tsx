import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Food Businesses Safe?",
  description: "95.6% of food businesses in England now hold a three-star or above hygiene rating — up from 91% in 2012. The FSA's mandatory display scheme and enforcement regime have driven sustained improvement.",
  openGraph: {
    title: "Are Britain's Food Businesses Safe?",
    description: "95.6% of food businesses in England now hold a three-star or above hygiene rating — up from 91% in 2012. The FSA's mandatory display scheme and enforcement regime have driven sustained improvement.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-hygiene-compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Food Businesses Safe?",
    description: "95.6% of food businesses in England now hold a three-star or above hygiene rating — up from 91% in 2012. The FSA's mandatory display scheme and enforcement regime have driven sustained improvement.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-hygiene-compliance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
