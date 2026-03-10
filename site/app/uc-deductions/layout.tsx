import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Universal Credit Deductions Pushing People Further Into Poverty?",
  description: "45% of Universal Credit claimants — 2.2 million people — have deductions taken from their payments each month. The average deduction is £61, mainly to repay advance loans that claimants needed to survive the five-week wait.",
  openGraph: {
    title: "Are Universal Credit Deductions Pushing People Further Into Poverty?",
    description: "45% of Universal Credit claimants — 2.2 million people — have deductions taken from their payments each month. The average deduction is £61, mainly to repay advance loans that claimants needed to survive the five-week wait.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/uc-deductions',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Universal Credit Deductions Pushing People Further Into Poverty?",
    description: "45% of Universal Credit claimants — 2.2 million people — have deductions taken from their payments each month. The average deduction is £61, mainly to repay advance loans that claimants needed to survive the five-week wait.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/uc-deductions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
