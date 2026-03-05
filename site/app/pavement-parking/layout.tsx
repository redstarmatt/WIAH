import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pavement Parking',
  description: 'An estimated 80% of wheelchair users report difficulty navigating pavements due to illegal parking, with limited enforcement.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
