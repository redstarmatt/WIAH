import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Stress Regions',
  description: 'South East England faces a supply-demand deficit of 5 billion litres per day by 2050 yet no major new reservoir has been built since 1991.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
