import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Lead Poisoning Britain's Drinking Water?',
  description: 'An estimated 8 million UK homes still have lead water pipes, with no national replacement programme.',
  openGraph: {
    title: 'Is Lead Poisoning Britain's Drinking Water?',
    description: 'An estimated 8 million UK homes still have lead water pipes, with no national replacement programme.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/water-lead-pipes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Lead Poisoning Britain's Drinking Water?',
    description: 'An estimated 8 million UK homes still have lead water pipes, with no national replacement programme.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/water-lead-pipes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
