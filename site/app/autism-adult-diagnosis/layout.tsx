import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How long does it take to get an autism diagnosis as an adult?',
  description: 'The average wait for an adult autism assessment in England is now 3.6 years, with over 116,000 people on the waiting list.',
  openGraph: {
    title: 'How long does it take to get an autism diagnosis as an adult?',
    description: 'The average wait for an adult autism assessment in England is now 3.6 years, with over 116,000 people on the waiting list.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/autism-adult-diagnosis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How long does it take to get an autism diagnosis as an adult?',
    description: 'The average wait for an adult autism assessment in England is now 3.6 years, with over 116,000 people on the waiting list.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/autism-adult-diagnosis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
