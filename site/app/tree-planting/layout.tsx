import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain Planting Enough Trees?`,
  description: "The UK planted 13,700 hectares in 2023-24, less than half the CCC-recommended 30,000 ha/year. England planted just 4,600 hectares — the government's own 30,000 ha/year England target by 2025 was missed by over 80%.",
  openGraph: {
    title: `Is Britain Planting Enough Trees?`,
    description: "The UK planted 13,700 hectares in 2023-24, less than half the CCC-recommended 30,000 ha/year. England planted just 4,600 hectares — the government's own 30,000 ha/year England target by 2025 was missed by over 80%.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/tree-planting',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain Planting Enough Trees?`,
    description: "The UK planted 13,700 hectares in 2023-24, less than half the CCC-recommended 30,000 ha/year. England planted just 4,600 hectares — the government's own 30,000 ha/year England target by 2025 was missed by over 80%.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/tree-planting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
