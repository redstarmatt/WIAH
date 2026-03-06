import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Workers Have No Guarantee of Regular Hours?',
  description: 'Over 1 million workers are on zero-hours contracts in the UK. 4.4 million are in insecure work (zero-hours, temporary, or agency). The gig economy grew 400% between 2016 and 2023. Insecure workers earn on average 14% less per hour and are 3 times more likely to be in poverty.',
  openGraph: {
    title: 'How Many Workers Have No Guarantee of Regular Hours?',
    description: 'Over 1 million workers are on zero-hours contracts in the UK. 4.4 million are in insecure work (zero-hours, temporary, or agency). The gig economy grew 400% between 2016 and 2023. Insecure workers earn on average 14% less per hour and are 3 times more likely to be in poverty.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/insecure-work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Workers Have No Guarantee of Regular Hours?',
    description: 'Over 1 million workers are on zero-hours contracts in the UK. 4.4 million are in insecure work (zero-hours, temporary, or agency). The gig economy grew 400% between 2016 and 2023. Insecure workers earn on average 14% less per hour and are 3 times more likely to be in poverty.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/insecure-work',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
