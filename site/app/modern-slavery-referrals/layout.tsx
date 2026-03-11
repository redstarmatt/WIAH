import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `How Many Modern Slavery Victims Are Being Found?`,
  description: '17,004 potential modern slavery victims were referred to the NRM in 2024, 71x the 2012 level. Labour exploitation now accounts for 42% of cases, and many victims wait over 12 months for a decision.',
  openGraph: {
    title: `How Many Modern Slavery Victims Are Being Found?`,
    description: '17,004 potential modern slavery victims were referred to the NRM in 2024, 71x the 2012 level. Labour exploitation now accounts for 42% of cases, and many victims wait over 12 months for a decision.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/modern-slavery-referrals',
  },
  twitter: {
    card: 'summary_large_image',
    title: `How Many Modern Slavery Victims Are Being Found?`,
    description: '17,004 potential modern slavery victims were referred to the NRM in 2024, 71x the 2012 level. Labour exploitation now accounts for 42% of cases, and many victims wait over 12 months for a decision.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/modern-slavery-referrals',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
