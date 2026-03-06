import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are apprenticeships actually working?',
  description: 'Apprenticeship starts have fallen 35% since the apprenticeship levy was introduced in 2017, with higher-level qualifications for existing employees replacing the entry-level training for young people the system was designed to support.',
  openGraph: {
    title: 'Are apprenticeships actually working?',
    description: 'Apprenticeship starts have fallen 35% since the apprenticeship levy was introduced in 2017, with higher-level qualifications for existing employees replacing the entry-level training for young people the system was designed to support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/apprenticeships',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are apprenticeships actually working?',
    description: 'Apprenticeship starts have fallen 35% since the apprenticeship levy was introduced in 2017, with higher-level qualifications for existing employees replacing the entry-level training for young people the system was designed to support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/apprenticeships',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
