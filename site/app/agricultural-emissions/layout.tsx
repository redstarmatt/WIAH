import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agricultural Emissions',
  description: 'Agriculture accounts for 11% of UK greenhouse gas emissions, and progress in reducing farm emissions has stalled since 2010 — methane from livestock the hardest',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
