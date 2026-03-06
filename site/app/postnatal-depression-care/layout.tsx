import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are New Mothers Getting Mental Health Support?',
  description: 'Around 1 in 5 new mothers experience perinatal mental health problems, but access to specialist support varies widely.',
  openGraph: {
    title: 'Are New Mothers Getting Mental Health Support?',
    description: 'Around 1 in 5 new mothers experience perinatal mental health problems, but access to specialist support varies widely.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/postnatal-depression-care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are New Mothers Getting Mental Health Support?',
    description: 'Around 1 in 5 new mothers experience perinatal mental health problems, but access to specialist support varies widely.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/postnatal-depression-care',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
