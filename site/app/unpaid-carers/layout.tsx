import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who Is Caring for Britain&apos;s 10 Million Unpaid Carers?',
  description: '10.6 million people in the UK provide unpaid care &mdash; looking after a disabled, elderly, or ill family member or friend. Their contribution is valued at &pound;162 billion per year &mdash; more than NHS spending. 600,000 carers are children under 18. But 72% of carers say their mental health has suffered. The Carer&apos;s Allowance of &pound;81.90 per week is among the lowest benefits in the welfare system.',
  openGraph: {
    title: 'Who Is Caring for Britain&apos;s 10 Million Unpaid Carers?',
    description: '10.6 million people in the UK provide unpaid care &mdash; looking after a disabled, elderly, or ill family member or friend. Their contribution is valued at &pound;162 billion per year &mdash; more than NHS spending. 600,000 carers are children under 18. But 72% of carers say their mental health has suffered. The Carer&apos;s Allowance of &pound;81.90 per week is among the lowest benefits in the welfare system.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/unpaid-carers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Is Caring for Britain&apos;s 10 Million Unpaid Carers?',
    description: '10.6 million people in the UK provide unpaid care &mdash; looking after a disabled, elderly, or ill family member or friend. Their contribution is valued at &pound;162 billion per year &mdash; more than NHS spending. 600,000 carers are children under 18. But 72% of carers say their mental health has suffered. The Carer&apos;s Allowance of &pound;81.90 per week is among the lowest benefits in the welfare system.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/unpaid-carers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
