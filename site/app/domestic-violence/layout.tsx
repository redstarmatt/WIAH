import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Experience Domestic Abuse in Britain?',
  description: '2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% of domestic abuse crimes result in a charge. 3,700 refuge spaces serve a population with 2× the estimated need.',
  openGraph: {
    title: 'How Many People Experience Domestic Abuse in Britain?',
    description: '2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% of domestic abuse crimes result in a charge. 3,700 refuge spaces serve a population with 2× the estimated need.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/domestic-violence',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Experience Domestic Abuse in Britain?',
    description: '2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% of domestic abuse crimes result in a charge. 3,700 refuge spaces serve a population with 2× the estimated need.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/domestic-violence',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
