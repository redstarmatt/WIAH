import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Are Young People Actually Earning?',
  description: 'Workers aged 18–24 earn 41% less than the median adult wage — a gap that has widened since 2010 despite minimum wage increases.',
  openGraph: {
    title: 'What Are Young People Actually Earning?',
    description: 'Workers aged 18–24 earn 41% less than the median adult wage — a gap that has widened since 2010 despite minimum wage increases.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/youth-wages',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Are Young People Actually Earning?',
    description: 'Workers aged 18–24 earn 41% less than the median adult wage — a gap that has widened since 2010 despite minimum wage increases.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/youth-wages',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
