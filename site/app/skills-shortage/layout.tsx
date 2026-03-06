import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills Shortage',
  description: 'Skills shortages cost the UK economy 6.6bn a year, with over 80% of employers reporting difficulty filling vacancies and 2.4 million roles classed as hard to fi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
