import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Where Does Britain's Plastic Waste Go?`,
  description: "615,000 tonnes of UK plastic waste were exported in 2023 — mostly to Turkey after China's import ban. Evidence from the EA and NGOs suggests significant proportions end up in illegal dumps.",
  openGraph: {
    title: `Where Does Britain's Plastic Waste Go?`,
    description: "615,000 tonnes of UK plastic waste were exported in 2023 — mostly to Turkey after China's import ban. Evidence from the EA and NGOs suggests significant proportions end up in illegal dumps.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/plastic-exports',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Where Does Britain's Plastic Waste Go?`,
    description: "615,000 tonnes of UK plastic waste were exported in 2023 — mostly to Turkey after China's import ban. Evidence from the EA and NGOs suggests significant proportions end up in illegal dumps.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/plastic-exports',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
