import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When You Live Far From Everything?',
  description: '10 million people live in rural England. 1,000 bus routes have been cut since 2010. Rural GP surgeries are closing at twice the rate of urban practices. Broadband coverage leaves 740,000 rural premises unable to access a 10Mbps connection. Rural residents travel on average 8 miles further to reach a GP than urban residents.',
  openGraph: {
    title: 'What Happens When You Live Far From Everything?',
    description: '10 million people live in rural England. 1,000 bus routes have been cut since 2010. Rural GP surgeries are closing at twice the rate of urban practices. Broadband coverage leaves 740,000 rural premises unable to access a 10Mbps connection. Rural residents travel on average 8 miles further to reach a GP than urban residents.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rural-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When You Live Far From Everything?',
    description: '10 million people live in rural England. 1,000 bus routes have been cut since 2010. Rural GP surgeries are closing at twice the rate of urban practices. Broadband coverage leaves 740,000 rural premises unable to access a 10Mbps connection. Rural residents travel on average 8 miles further to reach a GP than urban residents.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rural-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
