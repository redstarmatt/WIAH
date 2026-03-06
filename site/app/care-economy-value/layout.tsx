import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Unpaid Care Actually Worth?',
  description: `Britain's 10.6 million unpaid carers provide £93 billion of care annually — more than the NHS England budget — while average Carer's Allowance is just £81.90 per week.`,
  openGraph: {
    title: 'What Is Unpaid Care Actually Worth?',
    description: `Britain's 10.6 million unpaid carers provide £93 billion of care annually — more than the NHS England budget — while average Carer's Allowance is just £81.90 per week.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/care-economy-value',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Unpaid Care Actually Worth?',
    description: `Britain's 10.6 million unpaid carers provide £93 billion of care annually — more than the NHS England budget — while average Carer's Allowance is just £81.90 per week.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/care-economy-value',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
