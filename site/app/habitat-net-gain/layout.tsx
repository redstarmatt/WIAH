import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Biodiversity Net Gain Delivering for Nature?",
  description: "Mandatory biodiversity net gain came into force in February 2024 for major planning applications. 12,400 permissions have applied the 10% net gain standard, creating a new market for biodiversity credits.",
  openGraph: {
    title: "Is Biodiversity Net Gain Delivering for Nature?",
    description: "Mandatory biodiversity net gain came into force in February 2024 for major planning applications. 12,400 permissions have applied the 10% net gain standard, creating a new market for biodiversity credits.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/habitat-net-gain',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Biodiversity Net Gain Delivering for Nature?",
    description: "Mandatory biodiversity net gain came into force in February 2024 for major planning applications. 12,400 permissions have applied the 10% net gain standard, creating a new market for biodiversity credits.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/habitat-net-gain',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
