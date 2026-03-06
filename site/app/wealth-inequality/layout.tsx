import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who owns Britain's wealth?",
  description: 'The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% — a gap that has widened since 2006 and is driven primarily by property and pension inequality.',
  openGraph: {
    title: "Who owns Britain's wealth?",
    description: 'The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% — a gap that has widened since 2006 and is driven primarily by property and pension inequality.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/wealth-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Who owns Britain's wealth?",
    description: 'The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% — a gap that has widened since 2006 and is driven primarily by property and pension inequality.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/wealth-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
