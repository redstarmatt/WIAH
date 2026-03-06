import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Common Is Birth Trauma?',
  description: 'An estimated 1 in 3 women describe their birth experience as traumatic, with significant variation in postnatal support.',
  openGraph: {
    title: 'How Common Is Birth Trauma?',
    description: 'An estimated 1 in 3 women describe their birth experience as traumatic, with significant variation in postnatal support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/birth-trauma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Common Is Birth Trauma?',
    description: 'An estimated 1 in 3 women describe their birth experience as traumatic, with significant variation in postnatal support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/birth-trauma',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
