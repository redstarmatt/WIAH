import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Replaced Payday Loans After the FCA Clampdown?',
  description: 'The payday loan market collapsed 95% after FCA price caps in 2015, but buy-now-pay-later has created new unregulated debt traps affecting 1.2 million people.',
  openGraph: {
    title: 'What Replaced Payday Loans After the FCA Clampdown?',
    description: 'The payday loan market collapsed 95% after FCA price caps in 2015, but buy-now-pay-later has created new unregulated debt traps affecting 1.2 million people.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/payday-loan-decline',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Replaced Payday Loans After the FCA Clampdown?',
    description: 'The payday loan market collapsed 95% after FCA price caps in 2015, but buy-now-pay-later has created new unregulated debt traps affecting 1.2 million people.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/payday-loan-decline',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
