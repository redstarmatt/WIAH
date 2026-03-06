import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Marriage Dying?',
  description: 'Marriages fell to 236,000 in 2022 — the lowest since 1972 — while cohabiting couples have grown to 4.2 million, now the fastest-growing family type.',
  openGraph: {
    title: 'Is Marriage Dying?',
    description: 'Marriages fell to 236,000 in 2022 — the lowest since 1972 — while cohabiting couples have grown to 4.2 million, now the fastest-growing family type.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/marriage-cohabitation-trends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Marriage Dying?',
    description: 'Marriages fell to 236,000 in 2022 — the lowest since 1972 — while cohabiting couples have grown to 4.2 million, now the fastest-growing family type.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/marriage-cohabitation-trends',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
