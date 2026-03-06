import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many Workers Have No Guaranteed Hours?',
  description: 'Over 1.1 million workers in the UK are on zero-hours contracts — a figure that has nearly trebled since 2013 — leaving them without sick pay entitlement, pension auto-enrolment, or predictable income.',
  openGraph: {
    title: 'How Many Workers Have No Guaranteed Hours?',
    description: 'Over 1.1 million workers in the UK are on zero-hours contracts — a figure that has nearly trebled since 2013 — leaving them without sick pay entitlement, pension auto-enrolment, or predictable income.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/zero-hours-contracts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many Workers Have No Guaranteed Hours?',
    description: 'Over 1.1 million workers in the UK are on zero-hours contracts — a figure that has nearly trebled since 2013 — leaving them without sick pay entitlement, pension auto-enrolment, or predictable income.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/zero-hours-contracts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
