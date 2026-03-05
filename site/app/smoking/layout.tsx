import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS & Healthcare',
  description: 'Adult smoking rates have halved in 13 years — from 1 in 5 adults in 2011 to just 1 in 10 in 2024. Among 18–24 year olds, rates have collapsed from 1 in 4 to few',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
