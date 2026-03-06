import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are School Meals Actually Nutritious?',
  description: 'Schools broadly meet nutritional standards — but free school meal uptake falls well below eligibility, and primary school universality ends at Year 2.',
  openGraph: {
    title: 'Are School Meals Actually Nutritious?',
    description: 'Schools broadly meet nutritional standards — but free school meal uptake falls well below eligibility, and primary school universality ends at Year 2.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-meals-standards',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are School Meals Actually Nutritious?',
    description: 'Schools broadly meet nutritional standards — but free school meal uptake falls well below eligibility, and primary school universality ends at Year 2.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-meals-standards',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
