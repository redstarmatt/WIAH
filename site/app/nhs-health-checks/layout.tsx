import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are You Getting an NHS Health Check?',
  description: 'Only 48% of eligible people offered an NHS Health Check actually complete one, with large gaps by deprivation.',
  openGraph: {
    title: 'Are You Getting an NHS Health Check?',
    description: 'Only 48% of eligible people offered an NHS Health Check actually complete one, with large gaps by deprivation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-health-checks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are You Getting an NHS Health Check?',
    description: 'Only 48% of eligible people offered an NHS Health Check actually complete one, with large gaps by deprivation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-health-checks',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
