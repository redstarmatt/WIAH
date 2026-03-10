import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Fly-Tipping Getting Worse?",
  description: "Fly-tipping incidents in England hit 1.08 million in 2023 — a record. Clearance costs local authorities £392 million a year. Household waste accounts for 59% of incidents, driven by charges for bulky waste collection.",
  openGraph: {
    title: "Is Fly-Tipping Getting Worse?",
    description: "Fly-tipping incidents in England hit 1.08 million in 2023 — a record. Clearance costs local authorities £392 million a year. Household waste accounts for 59% of incidents, driven by charges for bulky waste collection.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/fly-tipping-england',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Fly-Tipping Getting Worse?",
    description: "Fly-tipping incidents in England hit 1.08 million in 2023 — a record. Clearance costs local authorities £392 million a year. Household waste accounts for 59% of incidents, driven by charges for bulky waste collection.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/fly-tipping-england',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
