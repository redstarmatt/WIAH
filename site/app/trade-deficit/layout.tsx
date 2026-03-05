import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trade Deficit',
  description: 'Britain runs a persistent goods deficit of £165 billion, only partially offset by a £125 billion services surplus — making trade balance heavily dependent on fi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
