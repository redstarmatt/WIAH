import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Waste Recycling',
  description: 'The UK generates 1.5 million tonnes of e-waste annually, with less than half formally recycled.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
