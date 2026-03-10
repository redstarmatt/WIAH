import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Equity Release Still a Viable Option for Older Homeowners?",
  description: "Equity release lending fell to £6 billion in 2024 as interest rates rose to 6.4% — making lifetime mortgages the most expensive they have been in a decade. 85,000 plans remain live.",
  openGraph: {
    title: "Is Equity Release Still a Viable Option for Older Homeowners?",
    description: "Equity release lending fell to £6 billion in 2024 as interest rates rose to 6.4% — making lifetime mortgages the most expensive they have been in a decade. 85,000 plans remain live.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/equity-release-market',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Equity Release Still a Viable Option for Older Homeowners?",
    description: "Equity release lending fell to £6 billion in 2024 as interest rates rose to 6.4% — making lifetime mortgages the most expensive they have been in a decade. 85,000 plans remain live.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/equity-release-market',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
