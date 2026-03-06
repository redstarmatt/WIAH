import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do community sentences actually reduce reoffending?',
  description: 'People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences.',
  openGraph: {
    title: 'Do community sentences actually reduce reoffending?',
    description: 'People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/community-sentence-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do community sentences actually reduce reoffending?',
    description: 'People given community sentences reoffend at a rate of 32%, compared to 45% for those given short custodial sentences.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/community-sentence-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
