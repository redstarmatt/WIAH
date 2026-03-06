import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many people are dying from drugs?',
  description: 'Drug poisoning deaths in England and Wales reached a record 4,907 in 2021 and have remained at near-record levels, driven by an ageing cohort of heroin users and the spread of illicitly manufactured fentanyl.',
  openGraph: {
    title: 'How many people are dying from drugs?',
    description: 'Drug poisoning deaths in England and Wales reached a record 4,907 in 2021 and have remained at near-record levels, driven by an ageing cohort of heroin users and the spread of illicitly manufactured fentanyl.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/drug-misuse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many people are dying from drugs?',
    description: 'Drug poisoning deaths in England and Wales reached a record 4,907 in 2021 and have remained at near-record levels, driven by an ageing cohort of heroin users and the spread of illicitly manufactured fentanyl.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/drug-misuse',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
