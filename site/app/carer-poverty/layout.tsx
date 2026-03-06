import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is the financial reality for unpaid carers?',
  description: 'Carers Allowance is £76.75 per week — the lowest benefit of its kind in Europe. It is withdrawn if the carer earns over £151 per week, creating a poverty trap. 6.5 million unpaid carers save the state an estimated £162 billion per year.',
  openGraph: {
    title: 'What is the financial reality for unpaid carers?',
    description: 'Carers Allowance is £76.75 per week — the lowest benefit of its kind in Europe. It is withdrawn if the carer earns over £151 per week, creating a poverty trap. 6.5 million unpaid carers save the state an estimated £162 billion per year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/carer-poverty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is the financial reality for unpaid carers?',
    description: 'Carers Allowance is £76.75 per week — the lowest benefit of its kind in Europe. It is withdrawn if the carer earns over £151 per week, creating a poverty trap. 6.5 million unpaid carers save the state an estimated £162 billion per year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/carer-poverty',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
