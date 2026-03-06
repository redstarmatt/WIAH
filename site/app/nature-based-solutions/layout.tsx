import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Nature Being Used to Fight Climate Change?',
  description: `Nature-based solutions could provide 15% of the UK's net zero pathway but are currently delivering just 3% of potential — though peatland restoration is accelerating fast.`,
  openGraph: {
    title: 'Is Nature Being Used to Fight Climate Change?',
    description: `Nature-based solutions could provide 15% of the UK's net zero pathway but are currently delivering just 3% of potential — though peatland restoration is accelerating fast.`,
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nature-based-solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Nature Being Used to Fight Climate Change?',
    description: `Nature-based solutions could provide 15% of the UK's net zero pathway but are currently delivering just 3% of potential — though peatland restoration is accelerating fast.`,
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nature-based-solutions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
