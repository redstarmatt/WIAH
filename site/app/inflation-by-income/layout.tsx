import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inflation by Income',
  description: 'At peak inflation in late 2022, households in the poorest income quintile faced 12.8% inflation — 2.4 percentage points higher than the wealthiest, as food and ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
