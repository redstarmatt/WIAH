import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Good at Attracting Tourists?",
  description: "Overseas visitors spent £31.1 billion in the UK in 2023 — recovering towards pre-pandemic levels. UK domestic tourism spending is £73 billion. The sector employs 3.1 million people directly and indirectly.",
  openGraph: {
    title: "Is Britain Good at Attracting Tourists?",
    description: "Overseas visitors spent £31.1 billion in the UK in 2023 — recovering towards pre-pandemic levels. UK domestic tourism spending is £73 billion. The sector employs 3.1 million people directly and indirectly.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/tourism-spending',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Good at Attracting Tourists?",
    description: "Overseas visitors spent £31.1 billion in the UK in 2023 — recovering towards pre-pandemic levels. UK domestic tourism spending is £73 billion. The sector employs 3.1 million people directly and indirectly.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/tourism-spending',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
