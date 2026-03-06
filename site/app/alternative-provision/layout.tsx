import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens to Pupils Outside Mainstream Schools?',
  description: 'Over 40,000 children are in alternative provision at any one time, with poor outcomes and limited oversight.',
  openGraph: {
    title: 'What Happens to Pupils Outside Mainstream Schools?',
    description: 'Over 40,000 children are in alternative provision at any one time, with poor outcomes and limited oversight.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/alternative-provision',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens to Pupils Outside Mainstream Schools?',
    description: 'Over 40,000 children are in alternative provision at any one time, with poor outcomes and limited oversight.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/alternative-provision',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
