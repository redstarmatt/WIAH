import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is hate crime increasing?',
  description: 'Hate crime in England and Wales more than doubled between 2013 and 2023, reaching a record 147,000 offences, though rises partly reflect improved recording and increasing willingness to report.',
  openGraph: {
    title: 'Is hate crime increasing?',
    description: 'Hate crime in England and Wales more than doubled between 2013 and 2023, reaching a record 147,000 offences, though rises partly reflect improved recording and increasing willingness to report.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/hate-crime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is hate crime increasing?',
    description: 'Hate crime in England and Wales more than doubled between 2013 and 2023, reaching a record 147,000 offences, though rises partly reflect improved recording and increasing willingness to report.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/hate-crime',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
