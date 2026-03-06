import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Many People Are Being Exploited in Britain?',
  description: '17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2023 — up 33% in a single year and 10 times the number in 2014. Experts estimate the true number in the UK exceeds 100,000. The conviction rate for modern slavery offences is just 4%. The UK is both a destination and a transit country.',
  openGraph: {
    title: 'How Many People Are Being Exploited in Britain?',
    description: '17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2023 — up 33% in a single year and 10 times the number in 2014. Experts estimate the true number in the UK exceeds 100,000. The conviction rate for modern slavery offences is just 4%. The UK is both a destination and a transit country.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/modern-slavery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Many People Are Being Exploited in Britain?',
    description: '17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2023 — up 33% in a single year and 10 times the number in 2014. Experts estimate the true number in the UK exceeds 100,000. The conviction rate for modern slavery offences is just 4%. The UK is both a destination and a transit country.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/modern-slavery',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
