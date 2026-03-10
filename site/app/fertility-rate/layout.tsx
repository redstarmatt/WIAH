import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Having Fewer Babies?",
  description: "The UK total fertility rate fell to a record low of 1.41 in 2024 \u2014 well below the 2.1 replacement rate. Annual births reached their lowest level since 1977.",
  openGraph: {
    title: "Is Britain Having Fewer Babies?",
    description: "The UK total fertility rate fell to a record low of 1.41 in 2024 \u2014 well below the 2.1 replacement rate. Annual births reached their lowest level since 1977.",
    type: 'article',
    url: "https://whatisactuallyhappening.uk/fertility-rate",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Having Fewer Babies?",
    description: "The UK total fertility rate fell to a record low of 1.41 in 2024 \u2014 well below the 2.1 replacement rate. Annual births reached their lowest level since 1977.",
  },
  alternates: {
    canonical: "https://whatisactuallyhappening.uk/fertility-rate",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>({children})</>;
}
