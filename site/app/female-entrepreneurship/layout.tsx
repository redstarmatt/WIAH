import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Women Starting Businesses in Britain?',
  description: 'Female-founded businesses have risen steadily, but women still start only 1 in 4 businesses and receive just 2p of every £1 in venture capital.',
  openGraph: {
    title: 'Are Women Starting Businesses in Britain?',
    description: 'Female-founded businesses have risen steadily, but women still start only 1 in 4 businesses and receive just 2p of every £1 in venture capital.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/female-entrepreneurship',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Women Starting Businesses in Britain?',
    description: 'Female-founded businesses have risen steadily, but women still start only 1 in 4 businesses and receive just 2p of every £1 in venture capital.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/female-entrepreneurship',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
