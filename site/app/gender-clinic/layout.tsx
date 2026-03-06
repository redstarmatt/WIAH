import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Long Are People Waiting for Gender Care?',
  description: 'The average wait for a gender identity clinic first appointment reached 5–7 years in 2023, with over 26,000 people on waiting lists — a sevenfold increase in eight years, driven by surging demand against static NHS capacity.',
  openGraph: {
    title: 'How Long Are People Waiting for Gender Care?',
    description: 'The average wait for a gender identity clinic first appointment reached 5–7 years in 2023, with over 26,000 people on waiting lists — a sevenfold increase in eight years, driven by surging demand against static NHS capacity.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gender-clinic',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Long Are People Waiting for Gender Care?',
    description: 'The average wait for a gender identity clinic first appointment reached 5–7 years in 2023, with over 26,000 people on waiting lists — a sevenfold increase in eight years, driven by surging demand against static NHS capacity.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gender-clinic',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
