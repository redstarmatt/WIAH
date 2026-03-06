import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are Children Getting the Mental Health Help They Need?',
  description: 'Over 1.8 million under-18s are in contact with NHS mental health services &mdash; a record high &mdash; but half of those referred wait more than 18 weeks. Hospital admissions for self-harm among teenagers have risen 52% in a decade. Child and Adolescent Mental Health Services (CAMHS) in England have 127,000 on waiting lists, with some children waiting over two years.',
  openGraph: {
    title: 'Are Children Getting the Mental Health Help They Need?',
    description: 'Over 1.8 million under-18s are in contact with NHS mental health services &mdash; a record high &mdash; but half of those referred wait more than 18 weeks. Hospital admissions for self-harm among teenagers have risen 52% in a decade. Child and Adolescent Mental Health Services (CAMHS) in England have 127,000 on waiting lists, with some children waiting over two years.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/child-mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Children Getting the Mental Health Help They Need?',
    description: 'Over 1.8 million under-18s are in contact with NHS mental health services &mdash; a record high &mdash; but half of those referred wait more than 18 weeks. Hospital admissions for self-harm among teenagers have risen 52% in a decade. Child and Adolescent Mental Health Services (CAMHS) in England have 127,000 on waiting lists, with some children waiting over two years.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/child-mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
