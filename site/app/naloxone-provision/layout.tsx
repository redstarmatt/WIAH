import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Naloxone Getting to People Who Need It?",
  description: "108,000 naloxone packs were distributed in England last year — up from 26,000 in 2016. Each dose can reverse an opioid overdose. But drug deaths hit a record 4,907 in 2022, showing provision has not yet matched need.",
  openGraph: {
    title: "Is Naloxone Getting to People Who Need It?",
    description: "108,000 naloxone packs were distributed in England last year — up from 26,000 in 2016. Each dose can reverse an opioid overdose. But drug deaths hit a record 4,907 in 2022, showing provision has not yet matched need.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/naloxone-provision',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Naloxone Getting to People Who Need It?",
    description: "108,000 naloxone packs were distributed in England last year — up from 26,000 in 2016. Each dose can reverse an opioid overdose. But drug deaths hit a record 4,907 in 2022, showing provision has not yet matched need.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/naloxone-provision',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
