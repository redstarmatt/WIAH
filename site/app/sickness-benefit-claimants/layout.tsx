import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Too Ill to Work?',
  description: '3.1 million people are on health-related benefits &mdash; a 30% rise in two years driven by mental health, musculoskeletal and long COVID conditions.',
  openGraph: {
    title: 'How Many People Are Too Ill to Work?',
    description: '3.1 million people are on health-related benefits &mdash; a 30% rise in two years driven by mental health, musculoskeletal and long COVID conditions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/sickness-benefit-claimants',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Too Ill to Work?',
    description: '3.1 million people are on health-related benefits &mdash; a 30% rise in two years driven by mental health, musculoskeletal and long COVID conditions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sickness-benefit-claimants',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
