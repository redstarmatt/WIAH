import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many people are lonely in Britain?',
  description: 'Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day — yet public spending on the problem remains negligible.',
  openGraph: {
    title: 'How many people are lonely in Britain?',
    description: 'Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day — yet public spending on the problem remains negligible.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/loneliness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many people are lonely in Britain?',
    description: 'Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day — yet public spending on the problem remains negligible.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/loneliness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
