import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the Pupil Premium actually closing the attainment gap?',
  description: 'The Pupil Premium has invested £2.9 billion per year to close the attainment gap between disadvantaged pupils and their peers. The gap narrowed 4 percentage points from 2011–2019, but COVID widened it again. An 18-point gap still remains.',
  openGraph: {
    title: 'Is the Pupil Premium actually closing the attainment gap?',
    description: 'The Pupil Premium has invested £2.9 billion per year to close the attainment gap between disadvantaged pupils and their peers. The gap narrowed 4 percentage points from 2011–2019, but COVID widened it again. An 18-point gap still remains.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pupil-premium',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the Pupil Premium actually closing the attainment gap?',
    description: 'The Pupil Premium has invested £2.9 billion per year to close the attainment gap between disadvantaged pupils and their peers. The gap narrowed 4 percentage points from 2011–2019, but COVID widened it again. An 18-point gap still remains.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pupil-premium',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
