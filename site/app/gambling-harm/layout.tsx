import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much harm is gambling causing?',
  description: 'Around 300,000 people in Great Britain are problem gamblers, 1.8 million more are at risk, and online gambling growth has outpaced the regulatory system designed to protect them.',
  openGraph: {
    title: 'How much harm is gambling causing?',
    description: 'Around 300,000 people in Great Britain are problem gamblers, 1.8 million more are at risk, and online gambling growth has outpaced the regulatory system designed to protect them.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gambling-harm',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much harm is gambling causing?',
    description: 'Around 300,000 people in Great Britain are problem gamblers, 1.8 million more are at risk, and online gambling growth has outpaced the regulatory system designed to protect them.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gambling-harm',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
