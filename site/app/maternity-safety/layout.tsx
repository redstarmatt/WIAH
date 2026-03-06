import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is it safe to give birth in England?',
  description: 'The stillbirth rate has halved since 2010 to a record low of 3.53 per 1,000 births. But Black women are 3.7 times more likely to die in childbirth than white women &mdash; a disparity that has not improved in 20 years.',
  openGraph: {
    title: 'Is it safe to give birth in England?',
    description: 'The stillbirth rate has halved since 2010 to a record low of 3.53 per 1,000 births. But Black women are 3.7 times more likely to die in childbirth than white women &mdash; a disparity that has not improved in 20 years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/maternity-safety',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is it safe to give birth in England?',
    description: 'The stillbirth rate has halved since 2010 to a record low of 3.53 per 1,000 births. But Black women are 3.7 times more likely to die in childbirth than white women &mdash; a disparity that has not improved in 20 years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/maternity-safety',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
