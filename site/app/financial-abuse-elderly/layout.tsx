import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Widespread Is Financial Abuse of Older People?',
  description: 'Over 190,000 older people experience financial abuse every year in the UK, with £3.6 billion stolen annually — but fewer than 1 in 20 cases is ever reported.',
  openGraph: {
    title: 'How Widespread Is Financial Abuse of Older People?',
    description: 'Over 190,000 older people experience financial abuse every year in the UK, with £3.6 billion stolen annually — but fewer than 1 in 20 cases is ever reported.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/financial-abuse-elderly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Widespread Is Financial Abuse of Older People?',
    description: 'Over 190,000 older people experience financial abuse every year in the UK, with £3.6 billion stolen annually — but fewer than 1 in 20 cases is ever reported.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/financial-abuse-elderly',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
