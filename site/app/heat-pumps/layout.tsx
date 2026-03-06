import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Is Britain So Far Behind on Heat Pumps?',
  description: "The UK installed just 72,000 heat pumps in 2023 — less than a third of its 600,000–per–year target for 2028. France installed 1.6 million in the same year. The UK's legacy of gas boilers, high installation costs, and poorly insulated homes has made the heat pump transition uniquely slow.",
  openGraph: {
    title: 'Why Is Britain So Far Behind on Heat Pumps?',
    description: "The UK installed just 72,000 heat pumps in 2023 — less than a third of its 600,000–per–year target for 2028. France installed 1.6 million in the same year. The UK's legacy of gas boilers, high installation costs, and poorly insulated homes has made the heat pump transition uniquely slow.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/heat-pumps',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is Britain So Far Behind on Heat Pumps?',
    description: "The UK installed just 72,000 heat pumps in 2023 — less than a third of its 600,000–per–year target for 2028. France installed 1.6 million in the same year. The UK's legacy of gas boilers, high installation costs, and poorly insulated homes has made the heat pump transition uniquely slow.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/heat-pumps',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
