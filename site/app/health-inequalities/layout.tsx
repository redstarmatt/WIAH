import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How much does where you&rsquo;re born determine your health?',
  description: 'There is an 18.4-year healthy life expectancy gap between England&rsquo;s most and least deprived areas. A child born in Blackpool can expect 18 fewer years of good health than one born in Hart, Hampshire.',
  openGraph: {
    title: 'How much does where you&rsquo;re born determine your health?',
    description: 'There is an 18.4-year healthy life expectancy gap between England&rsquo;s most and least deprived areas. A child born in Blackpool can expect 18 fewer years of good health than one born in Hart, Hampshire.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/health-inequalities',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much does where you&rsquo;re born determine your health?',
    description: 'There is an 18.4-year healthy life expectancy gap between England&rsquo;s most and least deprived areas. A child born in Blackpool can expect 18 fewer years of good health than one born in Hart, Hampshire.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/health-inequalities',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
