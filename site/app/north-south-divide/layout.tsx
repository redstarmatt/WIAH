import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the economic gap between London and the rest of England widening?',
  description: `London's output per head is now 181% of the UK average — the North East's is 74%. The gap has widened by 30 percentage points since 1997. No major economy has regional inequality as extreme as the UK.`,
  openGraph: {
    title: 'Is the economic gap between London and the rest of England widening?',
    description: `London's output per head is now 181% of the UK average — the North East's is 74%. The gap has widened by 30 percentage points since 1997. No major economy has regional inequality as extreme as the UK.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/north-south-divide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the economic gap between London and the rest of England widening?',
    description: `London's output per head is now 181% of the UK average — the North East's is 74%. The gap has widened by 30 percentage points since 1997. No major economy has regional inequality as extreme as the UK.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/north-south-divide',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
