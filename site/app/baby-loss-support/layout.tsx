import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Support Exists After Baby Loss?',
  description: '1 in 4 pregnancies ends in loss, yet bereavement midwife provision remains inconsistent across NHS trusts.',
  openGraph: {
    title: 'What Support Exists After Baby Loss?',
    description: '1 in 4 pregnancies ends in loss, yet bereavement midwife provision remains inconsistent across NHS trusts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/baby-loss-support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Support Exists After Baby Loss?',
    description: '1 in 4 pregnancies ends in loss, yet bereavement midwife provision remains inconsistent across NHS trusts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/baby-loss-support',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
