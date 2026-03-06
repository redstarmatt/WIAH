import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are the Rich Getting Richer Through Inheritance?',
  description: 'Total inherited wealth in Britain has trebled since 1995 — and the top 10% of estates account for 50% of all inherited value.',
  openGraph: {
    title: 'Are the Rich Getting Richer Through Inheritance?',
    description: 'Total inherited wealth in Britain has trebled since 1995 — and the top 10% of estates account for 50% of all inherited value.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/inheritance-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are the Rich Getting Richer Through Inheritance?',
    description: 'Total inherited wealth in Britain has trebled since 1995 — and the top 10% of estates account for 50% of all inherited value.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/inheritance-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
