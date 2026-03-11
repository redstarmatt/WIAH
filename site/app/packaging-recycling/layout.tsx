import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Which Materials Is Britain Actually Recycling?`,
  description: 'UK packaging recycling rates vary enormously by material: paper 82%, glass 74%, but plastic just 51%. Total plastic packaging consumption of 950,000 tonnes creates a major recycling challenge.',
  openGraph: {
    title: `Which Materials Is Britain Actually Recycling?`,
    description: 'UK packaging recycling rates vary enormously by material: paper 82%, glass 74%, but plastic just 51%. Total plastic packaging consumption of 950,000 tonnes creates a major recycling challenge.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/packaging-recycling',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Which Materials Is Britain Actually Recycling?`,
    description: 'UK packaging recycling rates vary enormously by material: paper 82%, glass 74%, but plastic just 51%. Total plastic packaging consumption of 950,000 tonnes creates a major recycling challenge.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/packaging-recycling',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
