import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High Streets',
  description: 'High street retail vacancy has reached 14%, the highest in over a decade. Store closures continue to outpace openings, while e-commerce has permanently taken 27',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
