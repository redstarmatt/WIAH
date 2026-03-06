import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Babies and Toddlers Going Hungry?',
  description: 'Baby banks served over 200,000 families in 2023, and 1 in 3 low-income parents says they have struggled to afford infant formula.',
  openGraph: {
    title: 'Are Babies and Toddlers Going Hungry?',
    description: 'Baby banks served over 200,000 families in 2023, and 1 in 3 low-income parents says they have struggled to afford infant formula.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/infant-food-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Babies and Toddlers Going Hungry?',
    description: 'Baby banks served over 200,000 families in 2023, and 1 in 3 low-income parents says they have struggled to afford infant formula.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/infant-food-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
