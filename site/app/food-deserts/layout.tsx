import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Do You Live in a Food Desert?',
  description: 'Around 8 million people in the UK live more than a mile from a supermarket and have limited access to fresh food. Deprived areas have five times fewer supermarkets per person than affluent ones. The cost-of-living crisis has intensified food access inequality: budget supermarkets are largely absent from deprived areas, while convenience stores charge a 10&ndash;20% premium on the same goods.',
  openGraph: {
    title: 'Do You Live in a Food Desert?',
    description: 'Around 8 million people in the UK live more than a mile from a supermarket and have limited access to fresh food. Deprived areas have five times fewer supermarkets per person than affluent ones. The cost-of-living crisis has intensified food access inequality: budget supermarkets are largely absent from deprived areas, while convenience stores charge a 10&ndash;20% premium on the same goods.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/food-deserts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do You Live in a Food Desert?',
    description: 'Around 8 million people in the UK live more than a mile from a supermarket and have limited access to fresh food. Deprived areas have five times fewer supermarkets per person than affluent ones. The cost-of-living crisis has intensified food access inequality: budget supermarkets are largely absent from deprived areas, while convenience stores charge a 10&ndash;20% premium on the same goods.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/food-deserts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
