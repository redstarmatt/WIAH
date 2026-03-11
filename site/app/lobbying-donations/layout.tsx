import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Who Is Buying Access to Government?`,
  description: '£20.3m in political donations declared in Q4 2024. Despite the 2014 lobbying register, fewer than 1,000 lobbyists are registered while 6,000+ lobbying contacts with ministers and officials go largely unrecorded.',
  openGraph: {
    title: `Who Is Buying Access to Government?`,
    description: '£20.3m in political donations declared in Q4 2024. Despite the 2014 lobbying register, fewer than 1,000 lobbyists are registered while 6,000+ lobbying contacts with ministers and officials go largely unrecorded.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/lobbying-donations',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Who Is Buying Access to Government?`,
    description: '£20.3m in political donations declared in Q4 2024. Despite the 2014 lobbying register, fewer than 1,000 lobbyists are registered while 6,000+ lobbying contacts with ministers and officials go largely unrecorded.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/lobbying-donations',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
