import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Has Cervical Screening Fallen to a 25-Year Low?",
  description: "Cervical screening coverage is at its lowest since records began — 69.9% against a 75% target. Stigma, access barriers and appointment shortages are driving the decline.",
  openGraph: {
    title: "Why Has Cervical Screening Fallen to a 25-Year Low?",
    description: "Cervical screening coverage is at its lowest since records began — 69.9% against a 75% target. Stigma, access barriers and appointment shortages are driving the decline.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/cervical-screening',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Has Cervical Screening Fallen to a 25-Year Low?",
    description: "Cervical screening coverage is at its lowest since records began — 69.9% against a 75% target. Stigma, access barriers and appointment shortages are driving the decline.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/cervical-screening',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
