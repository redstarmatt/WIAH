import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Britain&apos;s Schools Safe?',
  description: 'The Department for Education identified 174 schools across England with RAAC concrete that posed a risk of collapse in 2023. The school capital maintenance backlog is estimated at &pound;15 billion. One in three school buildings was constructed before 1976. Over 700,000 pupils were in schools with confirmed RAAC in the year it was publicly disclosed.',
  openGraph: {
    title: 'Are Britain&apos;s Schools Safe?',
    description: 'The Department for Education identified 174 schools across England with RAAC concrete that posed a risk of collapse in 2023. The school capital maintenance backlog is estimated at &pound;15 billion. One in three school buildings was constructed before 1976. Over 700,000 pupils were in schools with confirmed RAAC in the year it was publicly disclosed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-buildings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Britain&apos;s Schools Safe?',
    description: 'The Department for Education identified 174 schools across England with RAAC concrete that posed a risk of collapse in 2023. The school capital maintenance backlog is estimated at &pound;15 billion. One in three school buildings was constructed before 1976. Over 700,000 pupils were in schools with confirmed RAAC in the year it was publicly disclosed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-buildings',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
