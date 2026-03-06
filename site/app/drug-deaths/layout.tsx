import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Is Britain's Drug Death Toll Rising?",
  description: "Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland's rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment funding has been cut 30% in real terms since 2013. Opioids — mainly heroin — account for 48% of all drug deaths.",
  openGraph: {
    title: "Why Is Britain's Drug Death Toll Rising?",
    description: "Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland's rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment funding has been cut 30% in real terms since 2013. Opioids — mainly heroin — account for 48% of all drug deaths.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/drug-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Is Britain's Drug Death Toll Rising?",
    description: "Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland's rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment funding has been cut 30% in real terms since 2013. Opioids — mainly heroin — account for 48% of all drug deaths.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/drug-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
