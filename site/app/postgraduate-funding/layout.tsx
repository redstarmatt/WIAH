import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Still Afford a Postgraduate Degree?',
  description: 'Stacked postgraduate loan repayments now give some graduates a marginal effective tax rate of up to 68% — making advanced study financially ruinous for many.',
  openGraph: {
    title: 'Can You Still Afford a Postgraduate Degree?',
    description: 'Stacked postgraduate loan repayments now give some graduates a marginal effective tax rate of up to 68% — making advanced study financially ruinous for many.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/postgraduate-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Still Afford a Postgraduate Degree?',
    description: 'Stacked postgraduate loan repayments now give some graduates a marginal effective tax rate of up to 68% — making advanced study financially ruinous for many.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/postgraduate-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
