import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How reliable are court interpreter services?',
  description: 'There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice.',
  openGraph: {
    title: 'How reliable are court interpreter services?',
    description: 'There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/court-interpreter-services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How reliable are court interpreter services?',
    description: 'There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/court-interpreter-services',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
