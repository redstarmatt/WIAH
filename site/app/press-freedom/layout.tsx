import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Free Is the British Press?',
  description: 'The UK ranks 23rd in the world for press freedom &mdash; behind Jamaica, Namibia, and Costa Rica. While the ranking has improved from a low of 40th in 2017, structural concerns remain: three companies control 90&percnt; of national newspaper circulation, the Official Secrets Act criminalises journalism in the public interest, and the Investigatory Powers Act enables bulk surveillance of journalists&apos; communications.',
  openGraph: {
    title: 'How Free Is the British Press?',
    description: 'The UK ranks 23rd in the world for press freedom &mdash; behind Jamaica, Namibia, and Costa Rica. While the ranking has improved from a low of 40th in 2017, structural concerns remain: three companies control 90&percnt; of national newspaper circulation, the Official Secrets Act criminalises journalism in the public interest, and the Investigatory Powers Act enables bulk surveillance of journalists&apos; communications.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/press-freedom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Free Is the British Press?',
    description: 'The UK ranks 23rd in the world for press freedom &mdash; behind Jamaica, Namibia, and Costa Rica. While the ranking has improved from a low of 40th in 2017, structural concerns remain: three companies control 90&percnt; of national newspaper circulation, the Official Secrets Act criminalises journalism in the public interest, and the Investigatory Powers Act enables bulk surveillance of journalists&apos; communications.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/press-freedom',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
