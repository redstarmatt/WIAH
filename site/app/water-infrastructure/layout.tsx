import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain's Water System Actually Falling Apart?",
  description: "Water companies lose 2,780 megalitres per day to leakage — roughly 20&percnt; of total supply, enough to serve 20 million people. An estimated 25&percnt; of England's water pipes are over 100 years old, and the annual infrastructure investment gap has widened to £7.8 billion.",
  openGraph: {
    title: "Is Britain's Water System Actually Falling Apart?",
    description: "Water companies lose 2,780 megalitres per day to leakage — roughly 20&percnt; of total supply, enough to serve 20 million people. An estimated 25&percnt; of England's water pipes are over 100 years old, and the annual infrastructure investment gap has widened to £7.8 billion.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water-infrastructure',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain's Water System Actually Falling Apart?",
    description: "Water companies lose 2,780 megalitres per day to leakage — roughly 20&percnt; of total supply, enough to serve 20 million people. An estimated 25&percnt; of England's water pipes are over 100 years old, and the annual infrastructure investment gap has widened to £7.8 billion.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water-infrastructure',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
