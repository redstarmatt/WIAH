import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Alcohol Deaths Still Rising?",
  description: "Alcohol-specific deaths in England hit 9,641 in 2023 — a record high and up 32% since 2019. Alcohol-related hospital admissions now exceed one million per year.",
  openGraph: {
    title: "Are Alcohol Deaths Still Rising?",
    description: "Alcohol-specific deaths in England hit 9,641 in 2023 — a record high and up 32% since 2019. Alcohol-related hospital admissions now exceed one million per year.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/alcohol-specific-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Alcohol Deaths Still Rising?",
    description: "Alcohol-specific deaths in England hit 9,641 in 2023 — a record high and up 32% since 2019. Alcohol-related hospital admissions now exceed one million per year.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/alcohol-specific-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
