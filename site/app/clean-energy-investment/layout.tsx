import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Going Green?',
  description: 'UK clean energy investment reached £50 billion in 2023 — but it still trails the US Inflation Reduction Act stimulus by a factor of three.',
  openGraph: {
    title: 'Is Britain Actually Going Green?',
    description: 'UK clean energy investment reached £50 billion in 2023 — but it still trails the US Inflation Reduction Act stimulus by a factor of three.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/clean-energy-investment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Going Green?',
    description: 'UK clean energy investment reached £50 billion in 2023 — but it still trails the US Inflation Reduction Act stimulus by a factor of three.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/clean-energy-investment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
