import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are School Meals Getting Worse?',
  description: 'Average spend per primary school meal has risen only 15% in a decade while food costs have increased 40%, squeezing nutritional quality.',
  openGraph: {
    title: 'Are School Meals Getting Worse?',
    description: 'Average spend per primary school meal has risen only 15% in a decade while food costs have increased 40%, squeezing nutritional quality.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-meals-procurement',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are School Meals Getting Worse?',
    description: 'Average spend per primary school meal has risen only 15% in a decade while food costs have increased 40%, squeezing nutritional quality.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-meals-procurement',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
