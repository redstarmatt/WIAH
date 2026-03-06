import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Getting More Unequal?',
  description: 'The UK&apos;s Gini coefficient for income is 0.35 &mdash; above the OECD average of 0.32 and higher than Germany (0.29) and France (0.30). The richest 10% receive 29% of all income. Wealth inequality is far more extreme: the top 10% hold 43% of all wealth. Income inequality has been broadly stable since 2010 but wealth inequality is rising.',
  openGraph: {
    title: 'Is Britain Actually Getting More Unequal?',
    description: 'The UK&apos;s Gini coefficient for income is 0.35 &mdash; above the OECD average of 0.32 and higher than Germany (0.29) and France (0.30). The richest 10% receive 29% of all income. Wealth inequality is far more extreme: the top 10% hold 43% of all wealth. Income inequality has been broadly stable since 2010 but wealth inequality is rising.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Getting More Unequal?',
    description: 'The UK&apos;s Gini coefficient for income is 0.35 &mdash; above the OECD average of 0.32 and higher than Germany (0.29) and France (0.30). The richest 10% receive 29% of all income. Wealth inequality is far more extreme: the top 10% hold 43% of all wealth. Income inequality has been broadly stable since 2010 but wealth inequality is rising.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
