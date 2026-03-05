import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inequality',
  description: 'The UK s Gini coefficient for income is 0.35 above the OECD average of 0.32 and higher than Germany (0.29) and France (0.30). The richest 10% receive 29% of all',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
