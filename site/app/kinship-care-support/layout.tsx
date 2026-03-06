import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Kinship Carers Getting Enough Help?',
  description: 'An estimated 180,000 children live in kinship care arrangements, yet most kinship carers receive no financial support.',
  openGraph: {
    title: 'Are Kinship Carers Getting Enough Help?',
    description: 'An estimated 180,000 children live in kinship care arrangements, yet most kinship carers receive no financial support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/kinship-care-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Kinship Carers Getting Enough Help?',
    description: 'An estimated 180,000 children live in kinship care arrangements, yet most kinship carers receive no financial support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/kinship-care-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
