import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sepsis Outcomes',
  description: 'Sepsis kills around 48,000 people a year in the UK, but survival rates are improving with better early recognition.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
