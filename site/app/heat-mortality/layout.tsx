import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environment & Climate',
  description: 'The 2022 heatwaves caused at least 2,985 excess deaths in England — on days when 40°C was recorded for the first time. Climate projections suggest annual heat d',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
