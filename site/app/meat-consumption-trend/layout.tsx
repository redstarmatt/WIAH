import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Is Britain Eating Less Meat?",
  description: "UK per capita meat consumption has fallen from 93kg per year in 2010 to 84kg, driven by flexitarianism and rising meat prices. Plant-based product sales have reached £1.4 billion per year, though growth is now slowing.",
  openGraph: {
    title: "Is Britain Eating Less Meat?",
    description: "UK per capita meat consumption has fallen from 93kg per year in 2010 to 84kg, driven by flexitarianism and rising meat prices. Plant-based product sales have reached £1.4 billion per year, though growth is now slowing.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/meat-consumption-trend',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Britain Eating Less Meat?",
    description: "UK per capita meat consumption has fallen from 93kg per year in 2010 to 84kg, driven by flexitarianism and rising meat prices. Plant-based product sales have reached £1.4 billion per year, though growth is now slowing.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/meat-consumption-trend',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
