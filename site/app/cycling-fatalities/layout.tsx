import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are Cyclists Still Being Killed on British Roads?",
  description: "104 cyclists were killed on UK roads in 2023 — a rate of 16 per billion miles, compared to 2.5 in the Netherlands. Physical separation of cyclists from motor traffic remains rare in British towns.",
  openGraph: {
    title: "Why Are Cyclists Still Being Killed on British Roads?",
    description: "104 cyclists were killed on UK roads in 2023 — a rate of 16 per billion miles, compared to 2.5 in the Netherlands. Physical separation of cyclists from motor traffic remains rare in British towns.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cycling-fatalities',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are Cyclists Still Being Killed on British Roads?",
    description: "104 cyclists were killed on UK roads in 2023 — a rate of 16 per billion miles, compared to 2.5 in the Netherlands. Physical separation of cyclists from motor traffic remains rare in British towns.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cycling-fatalities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
