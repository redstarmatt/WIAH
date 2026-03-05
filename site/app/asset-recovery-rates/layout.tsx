import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asset Recovery Rates',
  description: 'The UK recovers around £378 million annually from criminal proceeds, against an estimated £12 billion laundered each year.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
