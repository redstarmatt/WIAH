import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Has Britain Actually Lost Its Public Toilets?',
  description: 'The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 &mdash; a 58&percnt; decline. Local authority spending on public conveniences has nearly halved in real terms since 2010.',
  openGraph: {
    title: 'Has Britain Actually Lost Its Public Toilets?',
    description: 'The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 &mdash; a 58&percnt; decline. Local authority spending on public conveniences has nearly halved in real terms since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-toilets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Has Britain Actually Lost Its Public Toilets?',
    description: 'The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 &mdash; a 58&percnt; decline. Local authority spending on public conveniences has nearly halved in real terms since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-toilets',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
