import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are 28 Million People in Pain?',
  description: 'Chronic pain affects an estimated 28 million adults in the UK — more than 40% of the population. It is the leading cause of disability and costs the economy 37 million lost working days per year, yet specialist pain clinic waits average 28 weeks.',
  openGraph: {
    title: 'Why Are 28 Million People in Pain?',
    description: 'Chronic pain affects an estimated 28 million adults in the UK — more than 40% of the population. It is the leading cause of disability and costs the economy 37 million lost working days per year, yet specialist pain clinic waits average 28 weeks.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/chronic-pain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are 28 Million People in Pain?',
    description: 'Chronic pain affects an estimated 28 million adults in the UK — more than 40% of the population. It is the leading cause of disability and costs the economy 37 million lost working days per year, yet specialist pain clinic waits average 28 weeks.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/chronic-pain',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
