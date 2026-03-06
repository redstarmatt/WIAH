import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can You Actually Get Mental Health Support on the NHS?',
  description: '1.9 million people are waiting for NHS mental health care. NHS talking therapies (IAPT) see 1.2 million people a year, but only 51% achieve recovery. CAMHS waiting times average 18 weeks for a first appointment. Mental health beds have fallen 27% since 2010.',
  openGraph: {
    title: 'Can You Actually Get Mental Health Support on the NHS?',
    description: '1.9 million people are waiting for NHS mental health care. NHS talking therapies (IAPT) see 1.2 million people a year, but only 51% achieve recovery. CAMHS waiting times average 18 weeks for a first appointment. Mental health beds have fallen 27% since 2010.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/mental-health',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can You Actually Get Mental Health Support on the NHS?',
    description: '1.9 million people are waiting for NHS mental health care. NHS talking therapies (IAPT) see 1.2 million people a year, but only 51% achieve recovery. CAMHS waiting times average 18 weeks for a first appointment. Mental health beds have fallen 27% since 2010.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/mental-health',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
