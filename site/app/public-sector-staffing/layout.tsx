import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Public Sector Losing Staff?',
  description: 'Civil service vacancy rates hit record highs while experienced staff leave for the private sector.',
  openGraph: {
    title: 'Is the Public Sector Losing Staff?',
    description: 'Civil service vacancy rates hit record highs while experienced staff leave for the private sector.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-sector-staffing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Public Sector Losing Staff?',
    description: 'Civil service vacancy rates hit record highs while experienced staff leave for the private sector.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-sector-staffing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
