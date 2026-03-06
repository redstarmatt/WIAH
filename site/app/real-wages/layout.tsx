import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are workers actually earning more than they were in 2008?',
  description: 'Real wages in 2024 are still around 1% below their 2008 peak — the longest sustained pay stagnation since the Napoleonic Wars. The brief recovery before COVID was wiped out by the 2022 inflation shock.',
  openGraph: {
    title: 'Are workers actually earning more than they were in 2008?',
    description: 'Real wages in 2024 are still around 1% below their 2008 peak — the longest sustained pay stagnation since the Napoleonic Wars. The brief recovery before COVID was wiped out by the 2022 inflation shock.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/real-wages',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are workers actually earning more than they were in 2008?',
    description: 'Real wages in 2024 are still around 1% below their 2008 peak — the longest sustained pay stagnation since the Napoleonic Wars. The brief recovery before COVID was wiped out by the 2022 inflation shock.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/real-wages',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
