import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Bad Are Britain's Potholes?",
  description: "England's local road maintenance backlog reached \u00a316.3bn in 2025. At current funding rates it would take 14 years to clear. 13 councils received the worst road rating.",
  openGraph: {
    title: "How Bad Are Britain's Potholes?",
    description: "England's local road maintenance backlog reached \u00a316.3bn in 2025. At current funding rates it would take 14 years to clear. 13 councils received the worst road rating.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/road-conditions",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Bad Are Britain's Potholes?",
    description: "England's local road maintenance backlog reached \u00a316.3bn in 2025. At current funding rates it would take 14 years to clear. 13 councils received the worst road rating.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/road-conditions",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
