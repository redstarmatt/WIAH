import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Are Britain's Roads Becoming More Dangerous?",
  description: "1,695 people were killed on UK roads in 2023 — up from a recent low of 1,472 in 2022, reversing a long-term downward trend. The 20mph limit rollout, drug-driving enforcement and road investment cuts all feature in the contested explanation.",
  openGraph: {
    title: "Are Britain's Roads Becoming More Dangerous?",
    description: "1,695 people were killed on UK roads in 2023 — up from a recent low of 1,472 in 2022, reversing a long-term downward trend. The 20mph limit rollout, drug-driving enforcement and road investment cuts all feature in the contested explanation.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/road-casualties',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Are Britain's Roads Becoming More Dangerous?",
    description: "1,695 people were killed on UK roads in 2023 — up from a recent low of 1,472 in 2022, reversing a long-term downward trend. The 20mph limit rollout, drug-driving enforcement and road investment cuts all feature in the contested explanation.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/road-casualties',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
