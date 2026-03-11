import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are Rail Fares Outpacing Wages?`,
  description: 'UK rail fares rose 94% in real terms since 1995 vs 50% for wages. The UK spends more of income on rail travel than any other major European country, with some commuter season tickets costing a month's salary.',
  openGraph: {
    title: `Are Rail Fares Outpacing Wages?`,
    description: 'UK rail fares rose 94% in real terms since 1995 vs 50% for wages. The UK spends more of income on rail travel than any other major European country, with some commuter season tickets costing a month's salary.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rail-fares-increase',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are Rail Fares Outpacing Wages?`,
    description: 'UK rail fares rose 94% in real terms since 1995 vs 50% for wages. The UK spends more of income on rail travel than any other major European country, with some commuter season tickets costing a month's salary.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rail-fares-increase',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
