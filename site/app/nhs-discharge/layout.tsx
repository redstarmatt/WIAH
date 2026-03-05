import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Discharge',
  description: 'On average, 13,500 patients per day are medically fit for discharge but cannot leave hospital occupying 1 billion worth of NHS bed days per year. Social care de',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
