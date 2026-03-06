import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Afford to Live Here?',
  description: 'The average home costs nearly 8 times the average salary — up from 3.5x in 1997. UK data on house prices, rent, and affordability by region.',
  openGraph: {
    title: 'Can You Actually Afford to Live Here?',
    description: 'The average home costs nearly 8 times the average salary — up from 3.5x in 1997. UK data on house prices, rent, and affordability by region.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Afford to Live Here?',
    description: 'The average home costs nearly 8 times the average salary — up from 3.5x in 1997.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
