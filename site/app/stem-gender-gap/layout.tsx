import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Girls Still Underrepresented in STEM?',
  description: 'Girls make up only 22% of physics A-level entrants and 16% of computing — gaps that narrow the pipeline to well-paid technical careers.',
  openGraph: {
    title: 'Why Are Girls Still Underrepresented in STEM?',
    description: 'Girls make up only 22% of physics A-level entrants and 16% of computing — gaps that narrow the pipeline to well-paid technical careers.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/stem-gender-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Girls Still Underrepresented in STEM?',
    description: 'Girls make up only 22% of physics A-level entrants and 16% of computing — gaps that narrow the pipeline to well-paid technical careers.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/stem-gender-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
