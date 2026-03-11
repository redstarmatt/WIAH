import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Who Still Can't Get Online?`,
  description: '5 million UK adults remain offline, with digital exclusion concentrated among older people, disabled adults, and low-income households. Access to essential services increasingly requires internet connectivity.',
  openGraph: {
    title: `Who Still Can't Get Online?`,
    description: '5 million UK adults remain offline, with digital exclusion concentrated among older people, disabled adults, and low-income households. Access to essential services increasingly requires internet connectivity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/internet-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Who Still Can't Get Online?`,
    description: '5 million UK adults remain offline, with digital exclusion concentrated among older people, disabled adults, and low-income households. Access to essential services increasingly requires internet connectivity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/internet-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
