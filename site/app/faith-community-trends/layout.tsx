import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Becoming Secular?',
  description: 'For the first time, more than half of people in England and Wales have no religion — but faith communities still provide £12 billion of social value annually.',
  openGraph: {
    title: 'Is Britain Becoming Secular?',
    description: 'For the first time, more than half of people in England and Wales have no religion — but faith communities still provide £12 billion of social value annually.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/faith-community-trends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Becoming Secular?',
    description: 'For the first time, more than half of people in England and Wales have no religion — but faith communities still provide £12 billion of social value annually.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/faith-community-trends',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
