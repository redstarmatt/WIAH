import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Are Disabled People So Much Less Active?",
  description: "43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Accessible facilities funding has stalled since 2010.",
  openGraph: {
    title: "Why Are Disabled People So Much Less Active?",
    description: "43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Accessible facilities funding has stalled since 2010.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/disability-sport-gap',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Are Disabled People So Much Less Active?",
    description: "43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Accessible facilities funding has stalled since 2010.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/disability-sport-gap',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
