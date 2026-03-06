import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Does Almost No Fraud Get Prosecuted?',
  description: 'Fraud accounts for 41&percnt; of all crime in England and Wales &mdash; an estimated 3.8 million offences per year &mdash; yet fewer than 1&percnt; of reported cases result in a conviction. Action Fraud, the national reporting centre, has been described by its own assessors as not fit for purpose.',
  openGraph: {
    title: 'Why Does Almost No Fraud Get Prosecuted?',
    description: 'Fraud accounts for 41&percnt; of all crime in England and Wales &mdash; an estimated 3.8 million offences per year &mdash; yet fewer than 1&percnt; of reported cases result in a conviction. Action Fraud, the national reporting centre, has been described by its own assessors as not fit for purpose.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fraud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Does Almost No Fraud Get Prosecuted?',
    description: 'Fraud accounts for 41&percnt; of all crime in England and Wales &mdash; an estimated 3.8 million offences per year &mdash; yet fewer than 1&percnt; of reported cases result in a conviction. Action Fraud, the national reporting centre, has been described by its own assessors as not fit for purpose.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fraud',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
