import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productivity',
  description: 'UK output per hour worked is 14% below the G7 average and 18% below the United States. Productivity growth flatlined after the 2008 financial crisis a decade of',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
