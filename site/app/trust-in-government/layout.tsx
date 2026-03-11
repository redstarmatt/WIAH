import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Do People Still Trust British Institutions?",
  description: "Trust in UK government fell to 24% in 2024 \u2014 near a 40-year low. Trust in the NHS remains higher at 65% but has also declined sharply since its 2020 pandemic peak.",
  openGraph: {
    title: "Do People Still Trust British Institutions?",
    description: "Trust in UK government fell to 24% in 2024 \u2014 near a 40-year low. Trust in the NHS remains higher at 65% but has also declined sharply since its 2020 pandemic peak.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/trust-in-government",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Do People Still Trust British Institutions?",
    description: "Trust in UK government fell to 24% in 2024 \u2014 near a 40-year low. Trust in the NHS remains higher at 65% but has also declined sharply since its 2020 pandemic peak.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/trust-in-government",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
