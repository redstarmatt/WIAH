import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What support do people get when they leave prison?',
  description: '46% of adults reoffend within one year of release. Those released with less than £50 are nearly twice as likely to reoffend.',
  openGraph: {
    title: 'What support do people get when they leave prison?',
    description: '46% of adults reoffend within one year of release. Those released with less than £50 are nearly twice as likely to reoffend.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/prison-reentry-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What support do people get when they leave prison?',
    description: '46% of adults reoffend within one year of release. Those released with less than £50 are nearly twice as likely to reoffend.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/prison-reentry-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
