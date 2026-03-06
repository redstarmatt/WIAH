import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Is Britain's Productivity So Persistently Low?",
  description: "UK output per hour worked is 14% below the G7 average and 18% below the United States. Productivity growth flatlined after the 2008 financial crisis — a decade of near-zero growth economists call the &lsquo;productivity puzzle&rsquo;. Regional inequality is severe: London's productivity is 70% above the UK average; the North East is 30% below.",
  openGraph: {
    title: "Why Is Britain's Productivity So Persistently Low?",
    description: "UK output per hour worked is 14% below the G7 average and 18% below the United States. Productivity growth flatlined after the 2008 financial crisis — a decade of near-zero growth economists call the &lsquo;productivity puzzle&rsquo;. Regional inequality is severe: London's productivity is 70% above the UK average; the North East is 30% below.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/productivity',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Is Britain's Productivity So Persistently Low?",
    description: "UK output per hour worked is 14% below the G7 average and 18% below the United States. Productivity growth flatlined after the 2008 financial crisis — a decade of near-zero growth economists call the &lsquo;productivity puzzle&rsquo;. Regional inequality is severe: London's productivity is 70% above the UK average; the North East is 30% below.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/productivity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
