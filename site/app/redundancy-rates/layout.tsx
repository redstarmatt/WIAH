import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redundancy Rates',
  description: 'Redundancy notifications hit 175,000 in 2024, rising sharply after April\'s National Insurance change, with retail and hospitality leading losses.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
