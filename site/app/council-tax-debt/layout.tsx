import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Council Tax Debt Is Building Up?',
  description: 'UK councils are owed £5.7 billion in unpaid council tax — a 45% increase since 2019 — and aggressive enforcement using bailiffs is driving some households into crisis.',
  openGraph: {
    title: 'How Much Council Tax Debt Is Building Up?',
    description: 'UK councils are owed £5.7 billion in unpaid council tax — a 45% increase since 2019 — and aggressive enforcement using bailiffs is driving some households into crisis.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/council-tax-debt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Council Tax Debt Is Building Up?',
    description: 'UK councils are owed £5.7 billion in unpaid council tax — a 45% increase since 2019 — and aggressive enforcement using bailiffs is driving some households into crisis.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/council-tax-debt',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
