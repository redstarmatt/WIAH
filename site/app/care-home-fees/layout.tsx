import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much does a care home actually cost?',
  description: 'The average care home fee in England is &pound;1,200 per week &mdash; &pound;62,400 per year. Self-funders pay 41% more than council-funded residents. The CMA found self-funders effectively cross-subsidise those funded by councils by &pound;8,600 per year.',
  openGraph: {
    title: 'How much does a care home actually cost?',
    description: 'The average care home fee in England is &pound;1,200 per week &mdash; &pound;62,400 per year. Self-funders pay 41% more than council-funded residents. The CMA found self-funders effectively cross-subsidise those funded by councils by &pound;8,600 per year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-home-fees',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much does a care home actually cost?',
    description: 'The average care home fee in England is &pound;1,200 per week &mdash; &pound;62,400 per year. Self-funders pay 41% more than council-funded residents. The CMA found self-funders effectively cross-subsidise those funded by councils by &pound;8,600 per year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-home-fees',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
