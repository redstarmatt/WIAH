import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Which Councils Are Going Bankrupt?`,
  description: '14 councils issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham — the largest municipal bankruptcy in European history. Government bailout loans total £3.6bn with austerity conditions.',
  openGraph: {
    title: `Which Councils Are Going Bankrupt?`,
    description: '14 councils issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham — the largest municipal bankruptcy in European history. Government bailout loans total £3.6bn with austerity conditions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/council-bankruptcy',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Which Councils Are Going Bankrupt?`,
    description: '14 councils issued Section 114 notices (effective bankruptcy) since 2018, including Birmingham — the largest municipal bankruptcy in European history. Government bailout loans total £3.6bn with austerity conditions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/council-bankruptcy',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
