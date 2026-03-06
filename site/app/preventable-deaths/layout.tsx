import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How many people die of preventable causes?',
  description: 'Avoidable mortality has fallen 27% since 2010 to 218 per 100,000 — one of the NHS&rsquo;s quiet success stories. But the gap between London (166) and the North East (276) means preventable deaths are 66% more common in the poorest regions.',
  openGraph: {
    title: 'How many people die of preventable causes?',
    description: 'Avoidable mortality has fallen 27% since 2010 to 218 per 100,000 — one of the NHS&rsquo;s quiet success stories. But the gap between London (166) and the North East (276) means preventable deaths are 66% more common in the poorest regions.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/preventable-deaths',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How many people die of preventable causes?',
    description: 'Avoidable mortality has fallen 27% since 2010 to 218 per 100,000 — one of the NHS&rsquo;s quiet success stories. But the gap between London (166) and the North East (276) means preventable deaths are 66% more common in the poorest regions.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/preventable-deaths',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
