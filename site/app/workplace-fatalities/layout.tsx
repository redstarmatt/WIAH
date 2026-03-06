import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Dangerous Is Going to Work?',
  description: '138 workers were killed at work in 2023/24 &mdash; the lowest rate since records began, but construction and agriculture remain disproportionately deadly.',
  openGraph: {
    title: 'How Dangerous Is Going to Work?',
    description: '138 workers were killed at work in 2023/24 &mdash; the lowest rate since records began, but construction and agriculture remain disproportionately deadly.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/workplace-fatalities',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Dangerous Is Going to Work?',
    description: '138 workers were killed at work in 2023/24 &mdash; the lowest rate since records began, but construction and agriculture remain disproportionately deadly.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/workplace-fatalities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
