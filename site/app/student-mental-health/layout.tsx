import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is There a Student Mental Health Crisis?',
  description: 'University counselling services are overwhelmed &mdash; demand has risen 50&percnt; in five years while funding has not kept pace &mdash; with 1 in 4 students reporting a mental health condition and 74 student deaths from suspected suicide recorded in 2021&ndash;22.',
  openGraph: {
    title: 'Is There a Student Mental Health Crisis?',
    description: 'University counselling services are overwhelmed &mdash; demand has risen 50&percnt; in five years while funding has not kept pace &mdash; with 1 in 4 students reporting a mental health condition and 74 student deaths from suspected suicide recorded in 2021&ndash;22.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/student-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is There a Student Mental Health Crisis?',
    description: 'University counselling services are overwhelmed &mdash; demand has risen 50&percnt; in five years while funding has not kept pace &mdash; with 1 in 4 students reporting a mental health condition and 74 student deaths from suspected suicide recorded in 2021&ndash;22.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/student-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
