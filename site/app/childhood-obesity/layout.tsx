import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many children are obese by the time they leave primary school?',
  description: '22.7% of Year 6 children in England are obese — more than 1 in 5. Children in the most deprived areas are 3 times more likely to be obese than those in the least deprived.',
  openGraph: {
    title: 'How many children are obese by the time they leave primary school?',
    description: '22.7% of Year 6 children in England are obese — more than 1 in 5. Children in the most deprived areas are 3 times more likely to be obese than those in the least deprived.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/childhood-obesity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many children are obese by the time they leave primary school?',
    description: '22.7% of Year 6 children in England are obese — more than 1 in 5. Children in the most deprived areas are 3 times more likely to be obese than those in the least deprived.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/childhood-obesity',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
