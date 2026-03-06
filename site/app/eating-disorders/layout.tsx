import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Serious is the Eating Disorder Crisis?',
  description: 'Hospital admissions for eating disorders have doubled since 2011 and NHS waiting times for treatment — sometimes exceeding two years — regularly cause irreversible physical harm.',
  openGraph: {
    title: 'How Serious is the Eating Disorder Crisis?',
    description: 'Hospital admissions for eating disorders have doubled since 2011 and NHS waiting times for treatment — sometimes exceeding two years — regularly cause irreversible physical harm.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/eating-disorders',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Serious is the Eating Disorder Crisis?',
    description: 'Hospital admissions for eating disorders have doubled since 2011 and NHS waiting times for treatment — sometimes exceeding two years — regularly cause irreversible physical harm.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/eating-disorders',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
