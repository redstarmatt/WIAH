import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Are the Self-Employed Getting Left Behind?`,
  description: 'Median self-employed earnings of £16,300 are 45% below equivalent employed workers. Two-thirds of the self-employed have no pension savings, creating a looming retirement crisis.',
  openGraph: {
    title: `Are the Self-Employed Getting Left Behind?`,
    description: 'Median self-employed earnings of £16,300 are 45% below equivalent employed workers. Two-thirds of the self-employed have no pension savings, creating a looming retirement crisis.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/self-employment-earnings',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Are the Self-Employed Getting Left Behind?`,
    description: 'Median self-employed earnings of £16,300 are 45% below equivalent employed workers. Two-thirds of the self-employed have no pension savings, creating a looming retirement crisis.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/self-employment-earnings',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
