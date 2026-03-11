import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Is Britain's Workplace Getting Safer?`,
  description: '138 workers were killed at work in 2024/25. Construction and agriculture account for over 40% of fatalities. While long-term trends are improving, the cost of workplace injury reaches £20.7bn per year.',
  openGraph: {
    title: `Is Britain's Workplace Getting Safer?`,
    description: '138 workers were killed at work in 2024/25. Construction and agriculture account for over 40% of fatalities. While long-term trends are improving, the cost of workplace injury reaches £20.7bn per year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/workplace-accidents',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Is Britain's Workplace Getting Safer?`,
    description: '138 workers were killed at work in 2024/25. Construction and agriculture account for over 40% of fatalities. While long-term trends are improving, the cost of workplace injury reaches £20.7bn per year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/workplace-accidents',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
