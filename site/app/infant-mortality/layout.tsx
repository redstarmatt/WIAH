import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infant Mortality',
  description: '3.6 babies per 1,000 live births die in England and Wales worse than France, Germany, Sweden, and Japan. Babies born in the most deprived areas are 2.5 times mo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
