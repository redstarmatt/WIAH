import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the High Street Dying?',
  description: 'Nearly one in seven retail units now stands empty — a vacancy rate of 13.9% that masks complete collapse in some market towns.',
  openGraph: {
    title: 'Is the High Street Dying?',
    description: 'Nearly one in seven retail units now stands empty — a vacancy rate of 13.9% that masks complete collapse in some market towns.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/high-street-vacancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the High Street Dying?',
    description: 'Nearly one in seven retail units now stands empty — a vacancy rate of 13.9% that masks complete collapse in some market towns.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/high-street-vacancy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
