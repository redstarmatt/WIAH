import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Flying Wrecking Britain&apos;s Climate Goals?',
  description: 'Aviation accounts for 7&ndash;8&percnt; of the UK&apos;s total climate impact &mdash; more than rail and buses combined &mdash; yet it benefits from an estimated &pound;7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.',
  openGraph: {
    title: 'Is Flying Wrecking Britain&apos;s Climate Goals?',
    description: 'Aviation accounts for 7&ndash;8&percnt; of the UK&apos;s total climate impact &mdash; more than rail and buses combined &mdash; yet it benefits from an estimated &pound;7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/aviation-emissions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Flying Wrecking Britain&apos;s Climate Goals?',
    description: 'Aviation accounts for 7&ndash;8&percnt; of the UK&apos;s total climate impact &mdash; more than rail and buses combined &mdash; yet it benefits from an estimated &pound;7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/aviation-emissions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
