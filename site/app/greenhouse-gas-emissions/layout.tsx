import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Actually Cutting Its Carbon Emissions?",
  description: "UK territorial emissions have fallen 53% since 1990 \u2014 meeting the fourth carbon budget. But consumption-based emissions remain 17% higher than the territorial figure.",
  openGraph: {
    title: "Is Britain Actually Cutting Its Carbon Emissions?",
    description: "UK territorial emissions have fallen 53% since 1990 \u2014 meeting the fourth carbon budget. But consumption-based emissions remain 17% higher than the territorial figure.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/greenhouse-gas-emissions",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Actually Cutting Its Carbon Emissions?",
    description: "UK territorial emissions have fallen 53% since 1990 \u2014 meeting the fourth carbon budget. But consumption-based emissions remain 17% higher than the territorial figure.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/greenhouse-gas-emissions",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
