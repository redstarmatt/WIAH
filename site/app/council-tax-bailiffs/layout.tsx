import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Many People Are Being Chased by Council Tax Bailiffs?",
  description: "Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 45% since 2019, and outstanding council tax debt stands at £6.1 billion.",
  openGraph: {
    title: "How Many People Are Being Chased by Council Tax Bailiffs?",
    description: "Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 45% since 2019, and outstanding council tax debt stands at £6.1 billion.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/council-tax-bailiffs',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Many People Are Being Chased by Council Tax Bailiffs?",
    description: "Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 45% since 2019, and outstanding council tax debt stands at £6.1 billion.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/council-tax-bailiffs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
