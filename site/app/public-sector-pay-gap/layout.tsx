import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Public Servants Being Paid Fairly?',
  description: 'Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfall.',
  openGraph: {
    title: 'Are Public Servants Being Paid Fairly?',
    description: 'Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfall.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-sector-pay-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Public Servants Being Paid Fairly?',
    description: 'Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfall.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-sector-pay-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
