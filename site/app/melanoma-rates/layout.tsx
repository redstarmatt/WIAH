import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Melanoma Cases Still Rising?",
  description: "Melanoma incidence has risen 135% in 40 years in the UK — now at 22.4 per 100,000. The five-year survival rate has improved to 93%, but Stage IV remains fatal for 80% of patients. Sunbed use remains a significant risk factor.",
  openGraph: {
    title: "Are Melanoma Cases Still Rising?",
    description: "Melanoma incidence has risen 135% in 40 years in the UK — now at 22.4 per 100,000. The five-year survival rate has improved to 93%, but Stage IV remains fatal for 80% of patients. Sunbed use remains a significant risk factor.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/melanoma-rates',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Melanoma Cases Still Rising?",
    description: "Melanoma incidence has risen 135% in 40 years in the UK — now at 22.4 per 100,000. The five-year survival rate has improved to 93%, but Stage IV remains fatal for 80% of patients. Sunbed use remains a significant risk factor.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/melanoma-rates',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
