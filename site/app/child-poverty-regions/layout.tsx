import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where is child poverty worst — and is it getting better?',
  description: '4.3 million children are in poverty in the UK — 30% of all children. The North East has the highest regional rate at 33%. 67% of children in poverty live in working families — challenging the idea that poverty is about unemployment.',
  openGraph: {
    title: 'Where is child poverty worst — and is it getting better?',
    description: '4.3 million children are in poverty in the UK — 30% of all children. The North East has the highest regional rate at 33%. 67% of children in poverty live in working families — challenging the idea that poverty is about unemployment.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-poverty-regions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where is child poverty worst — and is it getting better?',
    description: '4.3 million children are in poverty in the UK — 30% of all children. The North East has the highest regional rate at 33%. 67% of children in poverty live in working families — challenging the idea that poverty is about unemployment.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-poverty-regions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
