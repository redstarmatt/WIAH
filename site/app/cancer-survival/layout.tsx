import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer survival has risen by 10 percentage points in 15 years.',
  description: 'Five-year cancer survival in England rose from 46% in 2005 to 55.4% in 2023 — a 9.4 percentage-point improvement. This is one of the biggest sustained improvements in any health outcome in NHS history.',
  openGraph: {
    title: 'Cancer survival has risen by 10 percentage points in 15 years.',
    description: 'Five-year cancer survival in England rose from 46% in 2005 to 55.4% in 2023 — a 9.4 percentage-point improvement. This is one of the biggest sustained improvements in any health outcome in NHS history.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cancer-survival',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancer survival has risen by 10 percentage points in 15 years.',
    description: 'Five-year cancer survival in England rose from 46% in 2005 to 55.4% in 2023 — a 9.4 percentage-point improvement. This is one of the biggest sustained improvements in any health outcome in NHS history.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cancer-survival',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
