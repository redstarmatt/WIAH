import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Access NHS Therapy?',
  description: 'NHS Talking Therapies treats 1.2 million people annually — but 1 in 3 people referred never start treatment, and recovery rates vary from 40&percnt; to 75&percnt; between providers, making postcode a significant predictor of outcome.',
  openGraph: {
    title: 'Can You Actually Access NHS Therapy?',
    description: 'NHS Talking Therapies treats 1.2 million people annually — but 1 in 3 people referred never start treatment, and recovery rates vary from 40&percnt; to 75&percnt; between providers, making postcode a significant predictor of outcome.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/talking-therapies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Access NHS Therapy?',
    description: 'NHS Talking Therapies treats 1.2 million people annually — but 1 in 3 people referred never start treatment, and recovery rates vary from 40&percnt; to 75&percnt; between providers, making postcode a significant predictor of outcome.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/talking-therapies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
