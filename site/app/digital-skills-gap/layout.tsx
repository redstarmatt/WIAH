import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does Britain Have Enough Digital Skills?',
  description: '12.6 million UK adults lack essential digital skills, while 82% of job vacancies now require some digital competency — leaving a third of the working-age population at risk.',
  openGraph: {
    title: 'Does Britain Have Enough Digital Skills?',
    description: '12.6 million UK adults lack essential digital skills, while 82% of job vacancies now require some digital competency — leaving a third of the working-age population at risk.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/digital-skills-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does Britain Have Enough Digital Skills?',
    description: '12.6 million UK adults lack essential digital skills, while 82% of job vacancies now require some digital competency — leaving a third of the working-age population at risk.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/digital-skills-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
