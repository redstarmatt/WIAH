import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Waste',
  description: 'The UK wastes 9.5 million tonnes of food annually worth 19bn with households responsible for around 70% by weight. Simultaneously, 7 million people struggle to ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
