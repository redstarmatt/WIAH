import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Is British Manufacturing Still Below Pre-Pandemic Levels?",
  description: "UK manufacturing output remains at 96.2 on a 2019=100 index — still below pre-pandemic levels and declining as a share of GDP. Brexit supply chain disruption and energy costs have been compounding factors.",
  openGraph: {
    title: "Why Is British Manufacturing Still Below Pre-Pandemic Levels?",
    description: "UK manufacturing output remains at 96.2 on a 2019=100 index — still below pre-pandemic levels and declining as a share of GDP. Brexit supply chain disruption and energy costs have been compounding factors.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/manufacturing-output',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Is British Manufacturing Still Below Pre-Pandemic Levels?",
    description: "UK manufacturing output remains at 96.2 on a 2019=100 index — still below pre-pandemic levels and declining as a share of GDP. Brexit supply chain disruption and energy costs have been compounding factors.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/manufacturing-output',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
