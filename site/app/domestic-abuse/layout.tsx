import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Experience Domestic Abuse in Britain?',
  description: '2.1 million adults experienced domestic abuse in England and Wales in 2022/23 &mdash; 1.4 million women and 700,000 men. Police recorded 906,535 domestic abuse-related crimes. Conviction rates for domestic abuse are just 7.1%. Around 2 women are killed by a partner or ex-partner each week.',
  openGraph: {
    title: 'How Many People Experience Domestic Abuse in Britain?',
    description: '2.1 million adults experienced domestic abuse in England and Wales in 2022/23 &mdash; 1.4 million women and 700,000 men. Police recorded 906,535 domestic abuse-related crimes. Conviction rates for domestic abuse are just 7.1%. Around 2 women are killed by a partner or ex-partner each week.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/domestic-abuse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Experience Domestic Abuse in Britain?',
    description: '2.1 million adults experienced domestic abuse in England and Wales in 2022/23 &mdash; 1.4 million women and 700,000 men. Police recorded 906,535 domestic abuse-related crimes. Conviction rates for domestic abuse are just 7.1%. Around 2 women are killed by a partner or ex-partner each week.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/domestic-abuse',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
