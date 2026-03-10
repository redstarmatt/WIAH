import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Winning the War on Single-Use Plastic?",
  description: "Single-use carrier bag sales fell from 7.6 billion in 2014 to 1.7 billion following the introduction of the carrier bag charge. Nine types of single-use plastic items were banned in England from October 2023.",
  openGraph: {
    title: "Is Britain Winning the War on Single-Use Plastic?",
    description: "Single-use carrier bag sales fell from 7.6 billion in 2014 to 1.7 billion following the introduction of the carrier bag charge. Nine types of single-use plastic items were banned in England from October 2023.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/single-use-plastic-reduction',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Winning the War on Single-Use Plastic?",
    description: "Single-use carrier bag sales fell from 7.6 billion in 2014 to 1.7 billion following the introduction of the carrier bag charge. Nine types of single-use plastic items were banned in England from October 2023.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/single-use-plastic-reduction',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
