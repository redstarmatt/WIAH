import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Why Are Pensioners Not Claiming What They're Owed?`,
  description: '£2.2bn of Pension Credit goes unclaimed each year by 880,000 eligible pensioners. Take-up of just 63% means the poorest older people regularly miss out on their legal entitlement.',
  openGraph: {
    title: `Why Are Pensioners Not Claiming What They're Owed?`,
    description: '£2.2bn of Pension Credit goes unclaimed each year by 880,000 eligible pensioners. Take-up of just 63% means the poorest older people regularly miss out on their legal entitlement.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/pension-credit-uptake',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Why Are Pensioners Not Claiming What They're Owed?`,
    description: '£2.2bn of Pension Credit goes unclaimed each year by 880,000 eligible pensioners. Take-up of just 63% means the poorest older people regularly miss out on their legal entitlement.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/pension-credit-uptake',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
