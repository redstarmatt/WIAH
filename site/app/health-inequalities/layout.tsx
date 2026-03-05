import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Inequalities',
  description: 'There is an 18.4-year healthy life expectancy gap between England s most and least deprived areas. A child born in Blackpool can expect 18 fewer years of good h',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
