import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Long Do Asylum Seekers Wait for a Decision?",
  description: "48,700 asylum cases await a decision in the UK \u2014 down from a 134,000 peak but with an average wait of 18 months. The appeals backlog stands at 42,000 and is growing.",
  openGraph: {
    title: "How Long Do Asylum Seekers Wait for a Decision?",
    description: "48,700 asylum cases await a decision in the UK \u2014 down from a 134,000 peak but with an average wait of 18 months. The appeals backlog stands at 42,000 and is growing.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/asylum-backlog",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Long Do Asylum Seekers Wait for a Decision?",
    description: "48,700 asylum cases await a decision in the UK \u2014 down from a 134,000 peak but with an average wait of 18 months. The appeals backlog stands at 42,000 and is growing.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/asylum-backlog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
