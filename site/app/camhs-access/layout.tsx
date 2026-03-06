import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Can Children Get Mental Health Help?',
  description: 'More than half of children referred to CAMHS wait over 18 weeks, and over a quarter of referrals are rejected outright.',
  openGraph: {
    title: 'Can Children Get Mental Health Help?',
    description: 'More than half of children referred to CAMHS wait over 18 weeks, and over a quarter of referrals are rejected outright.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/camhs-access',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Children Get Mental Health Help?',
    description: 'More than half of children referred to CAMHS wait over 18 weeks, and over a quarter of referrals are rejected outright.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/camhs-access',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
