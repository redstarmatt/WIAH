import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Flying Wrecking Britain's Climate Goals?",
  description: "Aviation accounts for 7–8&percnt; of the UK's total climate impact — more than rail and buses combined — yet it benefits from an estimated £7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.",
  openGraph: {
    title: "Is Flying Wrecking Britain's Climate Goals?",
    description: "Aviation accounts for 7–8&percnt; of the UK's total climate impact — more than rail and buses combined — yet it benefits from an estimated £7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/aviation-emissions',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Flying Wrecking Britain's Climate Goals?",
    description: "Aviation accounts for 7–8&percnt; of the UK's total climate impact — more than rail and buses combined — yet it benefits from an estimated £7bn per year in tax exemptions: no fuel duty and no VAT on international flights. Passenger numbers have recovered to pre-pandemic levels and continue to grow.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/aviation-emissions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
