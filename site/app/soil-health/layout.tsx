import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soil Health',
  description: 'An estimated 2.9 billion tonnes of topsoil are lost to erosion across the UK each year, costing the economy 1.4 billion annually. Around 17% of agricultural soi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
