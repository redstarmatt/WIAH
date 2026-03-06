import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Will You Have Enough to Retire On?',
  description: 'The UK faces a £350 billion pension savings gap, with 39% of self-employed workers saving nothing for retirement.',
  openGraph: {
    title: 'Will You Have Enough to Retire On?',
    description: 'The UK faces a £350 billion pension savings gap, with 39% of self-employed workers saving nothing for retirement.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pension-savings-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will You Have Enough to Retire On?',
    description: 'The UK faces a £350 billion pension savings gap, with 39% of self-employed workers saving nothing for retirement.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pension-savings-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
