import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Landlords Abandoning the Private Rental Market?",
  description: "Net landlord numbers fell by 140,000 between 2022 and 2025 as mortgage costs, tax changes and regulatory burdens pushed smaller landlords to sell. Private rental listings are down 29%.",
  openGraph: {
    title: "Are Landlords Abandoning the Private Rental Market?",
    description: "Net landlord numbers fell by 140,000 between 2022 and 2025 as mortgage costs, tax changes and regulatory burdens pushed smaller landlords to sell. Private rental listings are down 29%.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/buy-to-let-exit',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Landlords Abandoning the Private Rental Market?",
    description: "Net landlord numbers fell by 140,000 between 2022 and 2025 as mortgage costs, tax changes and regulatory burdens pushed smaller landlords to sell. Private rental listings are down 29%.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/buy-to-let-exit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
