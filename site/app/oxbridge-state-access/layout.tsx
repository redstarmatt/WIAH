import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can State School Students Get Into Oxbridge?',
  description: 'Oxford and Cambridge have made progress — but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils.',
  openGraph: {
    title: 'Can State School Students Get Into Oxbridge?',
    description: 'Oxford and Cambridge have made progress — but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/oxbridge-state-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can State School Students Get Into Oxbridge?',
    description: 'Oxford and Cambridge have made progress — but state school students are still 23 percentage points underrepresented relative to their share of A-level pupils.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/oxbridge-state-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
