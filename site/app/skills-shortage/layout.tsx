import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain Running Out of Skilled Workers?',
  description: 'Skills shortages cost the UK economy £6.6bn a year, with over 80&percnt; of employers reporting difficulty filling vacancies and 2.4 million roles classed as hard to fill.',
  openGraph: {
    title: 'Is Britain Running Out of Skilled Workers?',
    description: 'Skills shortages cost the UK economy £6.6bn a year, with over 80&percnt; of employers reporting difficulty filling vacancies and 2.4 million roles classed as hard to fill.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/skills-shortage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain Running Out of Skilled Workers?',
    description: 'Skills shortages cost the UK economy £6.6bn a year, with over 80&percnt; of employers reporting difficulty filling vacancies and 2.4 million roles classed as hard to fill.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/skills-shortage',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
