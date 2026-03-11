import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Becoming More Unequal?`,
  description: 'UK income inequality has stabilised with a Gini of 0.33, but this masks wide variation. Top earners take home 9x the income of the poorest 10%, with the UK more unequal than France, Germany and most Northern European nations.',
  openGraph: {
    title: `Is Britain Becoming More Unequal?`,
    description: 'UK income inequality has stabilised with a Gini of 0.33, but this masks wide variation. Top earners take home 9x the income of the poorest 10%, with the UK more unequal than France, Germany and most Northern European nations.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/household-income-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Becoming More Unequal?`,
    description: 'UK income inequality has stabilised with a Gini of 0.33, but this masks wide variation. Top earners take home 9x the income of the poorest 10%, with the UK more unequal than France, Germany and most Northern European nations.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/household-income-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
