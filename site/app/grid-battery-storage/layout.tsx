import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grid Battery Storage',
  description: 'UK grid battery capacity has grown from near-zero to 4.2 GW but needs to reach 50 GW by 2035 to manage renewable intermittency.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
