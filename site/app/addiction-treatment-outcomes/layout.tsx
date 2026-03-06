import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Drug and Alcohol Treatment Working?',
  description: 'Only 47% of people completing drug or alcohol treatment achieve sustained recovery, and over 4,900 died from drug misuse in 2023.',
  openGraph: {
    title: 'Is Drug and Alcohol Treatment Working?',
    description: 'Only 47% of people completing drug or alcohol treatment achieve sustained recovery, and over 4,900 died from drug misuse in 2023.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/addiction-treatment-outcomes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Drug and Alcohol Treatment Working?',
    description: 'Only 47% of people completing drug or alcohol treatment achieve sustained recovery, and over 4,900 died from drug misuse in 2023.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/addiction-treatment-outcomes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
