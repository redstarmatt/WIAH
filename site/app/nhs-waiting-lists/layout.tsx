import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How long are NHS waiting lists?',
  description: 'Over 7.5 million people are waiting for elective NHS treatment in England — equivalent to one in eight of the population — with over 300,000 waiting more than a year.',
  openGraph: {
    title: 'How long are NHS waiting lists?',
    description: 'Over 7.5 million people are waiting for elective NHS treatment in England — equivalent to one in eight of the population — with over 300,000 waiting more than a year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-waiting-lists',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How long are NHS waiting lists?',
    description: 'Over 7.5 million people are waiting for elective NHS treatment in England — equivalent to one in eight of the population — with over 300,000 waiting more than a year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-waiting-lists',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
