import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Is School Uniform Costing Families?',
  description: 'A school uniform costs an average of £422 per child per year — consuming nearly 3% of the annual income of families in the poorest fifth.',
  openGraph: {
    title: 'How Much Is School Uniform Costing Families?',
    description: 'A school uniform costs an average of £422 per child per year — consuming nearly 3% of the annual income of families in the poorest fifth.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/school-uniform-costs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Is School Uniform Costing Families?',
    description: 'A school uniform costs an average of £422 per child per year — consuming nearly 3% of the annual income of families in the poorest fifth.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/school-uniform-costs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
