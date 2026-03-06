import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Actually Cutting Emissions?',
  description: 'UK emissions fell 4.7% in 2023 to 415 MtCO2e &mdash; broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050.',
  openGraph: {
    title: 'Is Britain Actually Cutting Emissions?',
    description: 'UK emissions fell 4.7% in 2023 to 415 MtCO2e &mdash; broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/uk-carbon-budget',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Actually Cutting Emissions?',
    description: 'UK emissions fell 4.7% in 2023 to 415 MtCO2e &mdash; broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/uk-carbon-budget',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
