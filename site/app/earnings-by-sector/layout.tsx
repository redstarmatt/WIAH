import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Which Jobs Are Actually Keeping Up With Inflation?`,
  description: 'Public sector real wages remain 12% below 2010 levels after a decade of pay restraint. Most private sector workers only recovered their 2008 real earnings by 2024, with wide variation by sector.',
  openGraph: {
    title: `Which Jobs Are Actually Keeping Up With Inflation?`,
    description: 'Public sector real wages remain 12% below 2010 levels after a decade of pay restraint. Most private sector workers only recovered their 2008 real earnings by 2024, with wide variation by sector.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/earnings-by-sector',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Which Jobs Are Actually Keeping Up With Inflation?`,
    description: 'Public sector real wages remain 12% below 2010 levels after a decade of pay restraint. Most private sector workers only recovered their 2008 real earnings by 2024, with wide variation by sector.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/earnings-by-sector',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
