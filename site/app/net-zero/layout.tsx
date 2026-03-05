import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Net Zero',
  description: 'UK greenhouse gas emissions fell to 371 million tonnes CO2-equivalent in 2024 the lowest level since 1872. The UK has cut emissions 53% since 1990 while GDP gre',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
