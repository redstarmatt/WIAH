import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Happens When You Fall Behind on Bills?',
  description: '2.4 million bailiff visits took place in 2023, with an average charge of &pound;310 added to debts &mdash; and nearly half of debtors show signs of vulnerability.',
  openGraph: {
    title: 'What Happens When You Fall Behind on Bills?',
    description: '2.4 million bailiff visits took place in 2023, with an average charge of &pound;310 added to debts &mdash; and nearly half of debtors show signs of vulnerability.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/debt-enforcement-hardship',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Happens When You Fall Behind on Bills?',
    description: '2.4 million bailiff visits took place in 2023, with an average charge of &pound;310 added to debts &mdash; and nearly half of debtors show signs of vulnerability.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/debt-enforcement-hardship',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
