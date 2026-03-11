import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Has Fraud Become Britain's Biggest Crime?",
  description: "Fraud accounts for 40% of all crime in England and Wales \u2014 3.7 million incidents in 2024. Only 5% of reported cases result in prosecution.",
  openGraph: {
    title: "Has Fraud Become Britain's Biggest Crime?",
    description: "Fraud accounts for 40% of all crime in England and Wales \u2014 3.7 million incidents in 2024. Only 5% of reported cases result in prosecution.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/online-fraud-growth",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Has Fraud Become Britain's Biggest Crime?",
    description: "Fraud accounts for 40% of all crime in England and Wales \u2014 3.7 million incidents in 2024. Only 5% of reported cases result in prosecution.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/online-fraud-growth",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
