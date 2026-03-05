import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noise Pollution',
  description: 'An estimated 9.7 million people in England are exposed to road traffic noise above the WHO s recommended safety threshold. Noise complaints to local authorities',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
