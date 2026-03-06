import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is it safe to swim in England's rivers?',
  description: 'Only 14% of English rivers are in good ecological status — and the UK has missed every water quality improvement target since 2004. Just 35% of monitored river bathing sites received 'excellent' ratings in 2023.',
  openGraph: {
    title: 'Is it safe to swim in England's rivers?',
    description: 'Only 14% of English rivers are in good ecological status — and the UK has missed every water quality improvement target since 2004. Just 35% of monitored river bathing sites received 'excellent' ratings in 2023.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/river-bathing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is it safe to swim in England's rivers?',
    description: 'Only 14% of English rivers are in good ecological status — and the UK has missed every water quality improvement target since 2004. Just 35% of monitored river bathing sites received 'excellent' ratings in 2023.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/river-bathing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
