import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Many People Are Actually Being Removed?`,
  description: '19,212 people were removed from the UK in 2024. Returns have fallen 70% from the 2005 peak of 65,000, far below stated government ambitions, with failed removals in 41% of attempts.',
  openGraph: {
    title: `How Many People Are Actually Being Removed?`,
    description: '19,212 people were removed from the UK in 2024. Returns have fallen 70% from the 2005 peak of 65,000, far below stated government ambitions, with failed removals in 41% of attempts.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/deportation-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Many People Are Actually Being Removed?`,
    description: '19,212 people were removed from the UK in 2024. Returns have fallen 70% from the 2005 peak of 65,000, far below stated government ambitions, with failed removals in 41% of attempts.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/deportation-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
