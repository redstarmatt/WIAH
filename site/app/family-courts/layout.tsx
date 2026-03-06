import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are Families Waiting for Court Decisions?',
  description: '62,400 cases are outstanding in England&apos;s family courts &mdash; up 64&percnt; from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the 2015 figure. Children caught in disputed proceedings wait nearly a year for a decision about where and with whom they will live.',
  openGraph: {
    title: 'How Long Are Families Waiting for Court Decisions?',
    description: '62,400 cases are outstanding in England&apos;s family courts &mdash; up 64&percnt; from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the 2015 figure. Children caught in disputed proceedings wait nearly a year for a decision about where and with whom they will live.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/family-courts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are Families Waiting for Court Decisions?',
    description: '62,400 cases are outstanding in England&apos;s family courts &mdash; up 64&percnt; from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the 2015 figure. Children caught in disputed proceedings wait nearly a year for a decision about where and with whom they will live.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/family-courts',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
