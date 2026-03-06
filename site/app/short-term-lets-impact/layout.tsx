import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Short-Term Letting Doing to British Housing?',
  description: 'Short-term lets have removed an estimated 250,000 homes from the long-term rental market, with coastal communities seeing up to 40% of stock listed on platforms.',
  openGraph: {
    title: 'What Is Short-Term Letting Doing to British Housing?',
    description: 'Short-term lets have removed an estimated 250,000 homes from the long-term rental market, with coastal communities seeing up to 40% of stock listed on platforms.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/short-term-lets-impact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Short-Term Letting Doing to British Housing?',
    description: 'Short-term lets have removed an estimated 250,000 homes from the long-term rental market, with coastal communities seeing up to 40% of stock listed on platforms.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/short-term-lets-impact',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
