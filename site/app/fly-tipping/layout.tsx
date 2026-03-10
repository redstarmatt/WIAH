import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Bad Is Britain's Fly-Tipping Problem?",
  description: "England recorded 1.07 million fly-tipping incidents in 2023-24 \u2014 a 10-year high. Clearance costs \u00a357.7m annually. Enforcement has fallen despite rising incidents.",
  openGraph: {
    title: "How Bad Is Britain's Fly-Tipping Problem?",
    description: "England recorded 1.07 million fly-tipping incidents in 2023-24 \u2014 a 10-year high. Clearance costs \u00a357.7m annually. Enforcement has fallen despite rising incidents.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/fly-tipping",
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Bad Is Britain's Fly-Tipping Problem?",
    description: "England recorded 1.07 million fly-tipping incidents in 2023-24 \u2014 a 10-year high. Clearance costs \u00a357.7m annually. Enforcement has fallen despite rising incidents.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/fly-tipping",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
