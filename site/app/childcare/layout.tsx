import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can British Families Actually Afford Childcare?',
  description: 'UK data and statistics on can british families actually afford childcare?. What is actually happening?',
  openGraph: {
    title: 'Can British Families Actually Afford Childcare?',
    description: 'UK data and statistics on can british families actually afford childcare?. What is actually happening?',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/childcare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can British Families Actually Afford Childcare?',
    description: 'UK data and statistics on can british families actually afford childcare?. What is actually happening?',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/childcare',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
