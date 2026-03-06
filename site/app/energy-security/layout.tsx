import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's energy supply secure?",
  description: "The 2022 energy crisis exposed Britain's dependence on imported gas: with no long-term storage and volatile global markets, household bills quadrupled and the government spent £40 billion on the Energy Price Guarantee.",
  openGraph: {
    title: "Is Britain's energy supply secure?",
    description: "The 2022 energy crisis exposed Britain's dependence on imported gas: with no long-term storage and volatile global markets, household bills quadrupled and the government spent £40 billion on the Energy Price Guarantee.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/energy-security',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's energy supply secure?",
    description: "The 2022 energy crisis exposed Britain's dependence on imported gas: with no long-term storage and volatile global markets, household bills quadrupled and the government spent £40 billion on the Energy Price Guarantee.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/energy-security',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
