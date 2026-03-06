import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Pensions Actually Secure?",
  description: '14 million workers have no workplace pension and the UK state pension replacement rate of 28&percnt; of earnings is one of the lowest in the OECD — despite auto-enrolment bringing 11 million new savers into schemes since 2012.',
  openGraph: {
    title: "Are Britain's Pensions Actually Secure?",
    description: '14 million workers have no workplace pension and the UK state pension replacement rate of 28&percnt; of earnings is one of the lowest in the OECD — despite auto-enrolment bringing 11 million new savers into schemes since 2012.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pension-deficits',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Pensions Actually Secure?",
    description: '14 million workers have no workplace pension and the UK state pension replacement rate of 28&percnt; of earnings is one of the lowest in the OECD — despite auto-enrolment bringing 11 million new savers into schemes since 2012.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pension-deficits',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
