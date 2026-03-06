import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Sits in Judgement?',
  description: 'Women make up 35&percnt; of judges in England and Wales but just 28&percnt; of Court of Appeal judges. Ethnic minority representation stands at 9.8&percnt; overall &mdash; in a country where 18&percnt; of the population identifies as non-white. At the Supreme Court, no judge has ever been from an ethnic minority background.',
  openGraph: {
    title: 'Who Sits in Judgement?',
    description: 'Women make up 35&percnt; of judges in England and Wales but just 28&percnt; of Court of Appeal judges. Ethnic minority representation stands at 9.8&percnt; overall &mdash; in a country where 18&percnt; of the population identifies as non-white. At the Supreme Court, no judge has ever been from an ethnic minority background.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/judicial-diversity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Sits in Judgement?',
    description: 'Women make up 35&percnt; of judges in England and Wales but just 28&percnt; of Court of Appeal judges. Ethnic minority representation stands at 9.8&percnt; overall &mdash; in a country where 18&percnt; of the population identifies as non-white. At the Supreme Court, no judge has ever been from an ethnic minority background.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/judicial-diversity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
