import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Does Universal Credit Actually Work?",
  description: "7.5 million people claim Universal Credit; 26% face deductions reducing their award. 45% of new claimants take an advance loan to cover the 5-week wait, creating immediate debt.",
  openGraph: {
    title: "Does Universal Credit Actually Work?",
    description: "7.5 million people claim Universal Credit; 26% face deductions reducing their award. 45% of new claimants take an advance loan to cover the 5-week wait, creating immediate debt.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/universal-credit-stats",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Does Universal Credit Actually Work?",
    description: "7.5 million people claim Universal Credit; 26% face deductions reducing their award. 45% of new claimants take an advance loan to cover the 5-week wait, creating immediate debt.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/universal-credit-stats",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
