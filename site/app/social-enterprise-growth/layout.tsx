import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Business Do Good?',
  description: `The UK's 100,000 social enterprises generate £60 billion a year and employ 2.3 million people — a quiet success story that almost nobody knows about.`,
  openGraph: {
    title: 'Can Business Do Good?',
    description: `The UK's 100,000 social enterprises generate £60 billion a year and employ 2.3 million people — a quiet success story that almost nobody knows about.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-enterprise-growth',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Business Do Good?',
    description: `The UK's 100,000 social enterprises generate £60 billion a year and employ 2.3 million people — a quiet success story that almost nobody knows about.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-enterprise-growth',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
