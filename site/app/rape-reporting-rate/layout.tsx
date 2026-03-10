import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Is the Rape Charge Rate Only 4%?",
  description: "70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process.",
  openGraph: {
    title: "Why Is the Rape Charge Rate Only 4%?",
    description: "70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/rape-reporting-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Is the Rape Charge Rate Only 4%?",
    description: "70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/rape-reporting-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
