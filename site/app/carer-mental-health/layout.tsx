import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What happens to carers&apos; mental health?',
  description: '72% of unpaid carers report mental health problems, yet just 1 in 4 receives any professional support.',
  openGraph: {
    title: 'What happens to carers&apos; mental health?',
    description: '72% of unpaid carers report mental health problems, yet just 1 in 4 receives any professional support.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/carer-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What happens to carers&apos; mental health?',
    description: '72% of unpaid carers report mental health problems, yet just 1 in 4 receives any professional support.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/carer-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
