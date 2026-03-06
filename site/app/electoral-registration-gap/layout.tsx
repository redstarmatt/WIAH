import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Can't Vote?',
  description: 'An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters and those from ethnic minority backgrounds.',
  openGraph: {
    title: 'How Many People Can't Vote?',
    description: 'An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters and those from ethnic minority backgrounds.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/electoral-registration-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Can't Vote?',
    description: 'An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters and those from ethnic minority backgrounds.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/electoral-registration-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
