import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Disabled Workers Paid Less?',
  description: 'Disabled workers earn 17% less than non-disabled workers — and face a 28-percentage-point employment gap that has barely improved since 2010.',
  openGraph: {
    title: 'Are Disabled Workers Paid Less?',
    description: 'Disabled workers earn 17% less than non-disabled workers — and face a 28-percentage-point employment gap that has barely improved since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disability-pay-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Disabled Workers Paid Less?',
    description: 'Disabled workers earn 17% less than non-disabled workers — and face a 28-percentage-point employment gap that has barely improved since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disability-pay-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
