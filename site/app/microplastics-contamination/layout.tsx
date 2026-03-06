import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Microplastics Contamination',
  description: 'Microplastics have been found in human blood (77%), lung tissue, and drinking water but the health impacts remain poorly understood.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
