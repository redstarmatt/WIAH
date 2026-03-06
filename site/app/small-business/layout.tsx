import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Small Businesses Actually Surviving?',
  description: 'Company insolvencies in England and Wales reached 27,500 in 2024 &mdash; the highest level in over 30 years. The five-year survival rate for new businesses has fallen to 38&percnt;, down from 44&percnt; a decade ago. Late payment by large firms costs small businesses an estimated &pound;23 billion per year in cash flow, with the average SME owed &pound;22,000 in overdue invoices.',
  openGraph: {
    title: 'Are Small Businesses Actually Surviving?',
    description: 'Company insolvencies in England and Wales reached 27,500 in 2024 &mdash; the highest level in over 30 years. The five-year survival rate for new businesses has fallen to 38&percnt;, down from 44&percnt; a decade ago. Late payment by large firms costs small businesses an estimated &pound;23 billion per year in cash flow, with the average SME owed &pound;22,000 in overdue invoices.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/small-business',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Small Businesses Actually Surviving?',
    description: 'Company insolvencies in England and Wales reached 27,500 in 2024 &mdash; the highest level in over 30 years. The five-year survival rate for new businesses has fallen to 38&percnt;, down from 44&percnt; a decade ago. Late payment by large firms costs small businesses an estimated &pound;23 billion per year in cash flow, with the average SME owed &pound;22,000 in overdue invoices.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/small-business',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
