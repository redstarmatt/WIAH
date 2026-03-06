import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does British Farming Contribute to Climate Change?',
  description: 'Agriculture accounts for 11% of UK greenhouse gas emissions, and progress in reducing farm emissions has stalled since 2010 — methane from livestock the hardest to cut.',
  openGraph: {
    title: 'How Much Does British Farming Contribute to Climate Change?',
    description: 'Agriculture accounts for 11% of UK greenhouse gas emissions, and progress in reducing farm emissions has stalled since 2010 — methane from livestock the hardest to cut.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/agricultural-emissions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Does British Farming Contribute to Climate Change?',
    description: 'Agriculture accounts for 11% of UK greenhouse gas emissions, and progress in reducing farm emissions has stalled since 2010 — methane from livestock the hardest to cut.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/agricultural-emissions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
