import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Children in Britain Are Growing Up in Poverty?',
  description: '4.3 million children in the UK live in poverty — 31% of all children, the highest rate since 1998. 3.2 million children live in relative poverty after housing costs. The two-child benefit limit affects 1.5 million children. Deprived areas of the North East have child poverty rates exceeding 45%.',
  openGraph: {
    title: 'How Many Children in Britain Are Growing Up in Poverty?',
    description: '4.3 million children in the UK live in poverty — 31% of all children, the highest rate since 1998. 3.2 million children live in relative poverty after housing costs. The two-child benefit limit affects 1.5 million children. Deprived areas of the North East have child poverty rates exceeding 45%.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Children in Britain Are Growing Up in Poverty?',
    description: '4.3 million children in the UK live in poverty — 31% of all children, the highest rate since 1998. 3.2 million children live in relative poverty after housing costs. The two-child benefit limit affects 1.5 million children. Deprived areas of the North East have child poverty rates exceeding 45%.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
