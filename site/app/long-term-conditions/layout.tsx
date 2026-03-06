import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many people are managing multiple long-term illnesses?',
  description: '15.4 million people in England live with two or more long-term conditions &mdash; accounting for 77% of all NHS spending. By 2035, this is projected to rise to 17.9 million as the population ages.',
  openGraph: {
    title: 'How many people are managing multiple long-term illnesses?',
    description: '15.4 million people in England live with two or more long-term conditions &mdash; accounting for 77% of all NHS spending. By 2035, this is projected to rise to 17.9 million as the population ages.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/long-term-conditions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many people are managing multiple long-term illnesses?',
    description: '15.4 million people in England live with two or more long-term conditions &mdash; accounting for 77% of all NHS spending. By 2035, this is projected to rise to 17.9 million as the population ages.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/long-term-conditions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
