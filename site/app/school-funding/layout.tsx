import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do schools have enough money?',
  description: 'Real per-pupil school funding in England in 2023 is still 9% below its 2009 peak, despite recent increases. Special educational needs funding carries a £2.1 billion structural deficit across councils. Sixth-form funding has been cut by 20% in real terms since 2010.',
  openGraph: {
    title: 'Do schools have enough money?',
    description: 'Real per-pupil school funding in England in 2023 is still 9% below its 2009 peak, despite recent increases. Special educational needs funding carries a £2.1 billion structural deficit across councils. Sixth-form funding has been cut by 20% in real terms since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-funding',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do schools have enough money?',
    description: 'Real per-pupil school funding in England in 2023 is still 9% below its 2009 peak, despite recent increases. Special educational needs funding carries a £2.1 billion structural deficit across councils. Sixth-form funding has been cut by 20% in real terms since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-funding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
