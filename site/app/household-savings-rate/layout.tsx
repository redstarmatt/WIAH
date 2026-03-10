import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Much Are British Households Actually Saving?",
  description: "The UK household savings ratio has fallen to 8.9% — below the long-run norm of 6.5%, with the COVID-era peak of 25.9% fully reversed. 24% of households have no savings at all, up from 20% in 2019.",
  openGraph: {
    title: "How Much Are British Households Actually Saving?",
    description: "The UK household savings ratio has fallen to 8.9% — below the long-run norm of 6.5%, with the COVID-era peak of 25.9% fully reversed. 24% of households have no savings at all, up from 20% in 2019.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/household-savings-rate',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Are British Households Actually Saving?",
    description: "The UK household savings ratio has fallen to 8.9% — below the long-run norm of 6.5%, with the COVID-era peak of 25.9% fully reversed. 24% of households have no savings at all, up from 20% in 2019.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/household-savings-rate',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
