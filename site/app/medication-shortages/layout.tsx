import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Get Your Medication?',
  description: 'Over 100 medicines were in shortage in 2023, affecting hundreds of thousands of patients.',
  openGraph: {
    title: 'Can You Get Your Medication?',
    description: 'Over 100 medicines were in shortage in 2023, affecting hundreds of thousands of patients.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/medication-shortages',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Get Your Medication?',
    description: 'Over 100 medicines were in shortage in 2023, affecting hundreds of thousands of patients.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/medication-shortages',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
