import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many businesses are going bust?',
  description: '25,158 company insolvencies were registered in England &amp; Wales in 2023 &mdash; the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and construction are the worst-hit sectors.',
  openGraph: {
    title: 'How many businesses are going bust?',
    description: '25,158 company insolvencies were registered in England &amp; Wales in 2023 &mdash; the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and construction are the worst-hit sectors.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/insolvencies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many businesses are going bust?',
    description: '25,158 company insolvencies were registered in England &amp; Wales in 2023 &mdash; the highest since 1993, and 50% higher than the pre-pandemic average. Hospitality and construction are the worst-hit sectors.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/insolvencies',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
