import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Waiting for ADHD and Autism Diagnoses?',
  description: 'Adults wait an average of 5&ndash;7 years for an autism diagnosis on the NHS. ADHD assessment waits routinely exceed 3 years in most areas. 187,000 children are waiting for autism assessment. The number of adults seeking ADHD diagnosis has grown 400% since 2020, overwhelming services designed for a fraction of demand.',
  openGraph: {
    title: 'How Long Are People Waiting for ADHD and Autism Diagnoses?',
    description: 'Adults wait an average of 5&ndash;7 years for an autism diagnosis on the NHS. ADHD assessment waits routinely exceed 3 years in most areas. 187,000 children are waiting for autism assessment. The number of adults seeking ADHD diagnosis has grown 400% since 2020, overwhelming services designed for a fraction of demand.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adhd-autism',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Waiting for ADHD and Autism Diagnoses?',
    description: 'Adults wait an average of 5&ndash;7 years for an autism diagnosis on the NHS. ADHD assessment waits routinely exceed 3 years in most areas. 187,000 children are waiting for autism assessment. The number of adults seeking ADHD diagnosis has grown 400% since 2020, overwhelming services designed for a fraction of demand.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adhd-autism',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
