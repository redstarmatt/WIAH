import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are we ready for the dementia crisis?',
  description: 'Almost a million people in the UK are living with dementia, but diagnosis rates are falling and care capacity is being overwhelmed.',
  openGraph: {
    title: 'Are we ready for the dementia crisis?',
    description: 'Almost a million people in the UK are living with dementia, but diagnosis rates are falling and care capacity is being overwhelmed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/dementia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are we ready for the dementia crisis?',
    description: 'Almost a million people in the UK are living with dementia, but diagnosis rates are falling and care capacity is being overwhelmed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/dementia',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
