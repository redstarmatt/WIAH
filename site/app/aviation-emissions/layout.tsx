import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviation Emissions',
  description: 'Aviation accounts for 7 8% of the UK s total climate impact more than rail and buses combined yet it benefits from an estimated 7bn per year in tax exemptions: ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
